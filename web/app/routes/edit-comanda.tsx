
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { type Order, type Meal, type Product, type PostOrderSchema } from "../../types";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { Separator } from "~/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Route } from "./+types/edit-comanda";
import { Badge } from "~/components/ui/badge";
import { Save, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { Spinner } from "~/components/ui/spinner";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Label } from "~/components/ui/label";
import { useThresholdSpinnerStore } from "~/store/threshold-spinner";
import { ScrollArea } from "~/components/ui/scroll-area";


function createNewOrder(comandaNumber: string): Order {
  return {
    number: comandaNumber,
    meals: [],
    date: new Date().toISOString(),
    otherItems: [],
    status: 'Open',
    total: '0',
  };
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const comandaNumber = params.comandaNumber;

  const [orderResponse, mealsResponse, productsResponse] = await Promise.all([
    fetch(`https://churrascaria-api.chamber-vault.uk/orders/open/${comandaNumber}`),
    fetch(`https://churrascaria-api.chamber-vault.uk/meals`),
    fetch(`https://churrascaria-api.chamber-vault.uk/products`)
  ]);

  let order: Order;
  if (orderResponse.ok) {
    const existedOrder = await orderResponse.json();
    order = existedOrder?.order ?? createNewOrder(comandaNumber);
    toast.success("Comanda carregada com sucesso!", { position: "top-right" });
  } else {
    order = createNewOrder(comandaNumber);
    toast.info("Comanda não encontrada. Criando uma nova comanda.", { position: "top-right" });
  }

  const meals = mealsResponse.ok ? await mealsResponse.json() : [];
  const products = productsResponse.ok ? await productsResponse.json() : [];

  return ({ order, meals, products });
}


export function HydrateFallback() {
  return (
    <div className="flex flex-col min-h-screen gap-4 justify-center items-center mx-auto p-4">
      <Card className="w-full flex flex-col justify-center">
        <CardHeader>
          <CardTitle><h1 className="text-2xl font-bold mb-1 text-muted-foreground">Carregando Comanda...</h1> <Spinner /></CardTitle>
          <CardDescription className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[150px]" />

          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}



export default function Comanda({ loaderData }: Route.ComponentProps) {
  const { order, meals, products } = loaderData;
  const [peso, setPeso] = useState("1");
  const [total, setTotal] = useState("0");
  const navigate = useNavigate();
  const loading = useThresholdSpinnerStore();

  function calculatePricePerWeight(basePrice: string, weight: string, index: number) {
    setPeso(weight);
    const price = (parseFloat(basePrice) * parseFloat(weight)).toFixed(2);
    setValue(`meals.${index}.price`, price);
  }

  const { register, control, handleSubmit, formState: { errors }, setValue, watch } = useForm<Order>({
    defaultValues: order,
  });

  const { fields: mealFields, append: appendMeal, remove: removeMeal } = useFieldArray({
    control,
    name: "meals",
  });

  const { fields: otherItemFields, append: appendOtherItem, remove: removeOtherItem } = useFieldArray({
    control,
    name: "otherItems",
  });
  const productArray = watch("otherItems");
  const mealsArray = watch("meals");
  useEffect(() => {
    const mealsTotal = mealsArray.reduce((acc, meal) => acc + parseFloat(meal.price || "0"), 0);
    const otherItemsTotal = productArray?.reduce((acc, item) => acc + parseFloat(item.price || "0"), 0);
    const total = (mealsTotal + otherItemsTotal!).toFixed(2);
    setTotal(total);
    setValue("total", total);
  }, [mealsArray, productArray, setValue]);

  const onSubmit = async (data: PostOrderSchema) => {
    //Drop items without value
    const filteredData = {
      ...data,
      meals: data.meals.filter((meal) => meal.name),
      otherItems: data.otherItems?.filter((item) => item.name),
    };

    await fetch("https://churrascaria-api.chamber-vault.uk/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredData),
    }).then((response) => {
      response.ok ? toast.success("Comanda salva com sucesso!", { position: "top-right" }) : toast.error("Erro ao salvar a comanda.", { position: "top-right" });
      console.log(response.json());
      navigate(-1);
    })


  };

  return (
    <div className="flex flex-col mt-10 gap-4 justify-center items-center mx-auto p-4">


      <Card className="w-108 md:w-150 flex flex-col justify-center">
        <CardHeader>
          <CardTitle><h1 className="text-2xl font-bold mb-1">Editar Comanda: {order.number} - R$ {total}</h1></CardTitle>
          <CardDescription>
            <p>Status: {order.status}</p>
            <p> Data de Abertura: {new Date(order.date || "").toLocaleString()}</p>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ScrollArea>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl flex flex-col h-114 md:h-140 justify-center mx-auto">

              <div className="">
                {/* GAMBIARRA */}
                <span className="h-10 text-zinc-50">.</span>
                <h2 className="text-2xl font-semibold mb-3">Refeições</h2>


                {mealFields.map((field, index) => (
                  <div className="mb-4 border rounded-lg">
                    <Badge className="mx-4 mt-2" variant={"outline"}>R$ {mealsArray[index]?.price || "0,00"}</Badge>
                    <div key={field.id} className="flex flex-col items-center justify-center gap-2  p-2 ">
                      <Controller
                        control={control}
                        name={`meals.${index}.name`}
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              const selectedMeal = meals.find((m: Meal) => m.name === value);
                              if (selectedMeal) {
                                setValue(`meals.${index}.price`, selectedMeal.price);
                                setValue(`meals.${index}.weekendPrice`, selectedMeal.weekendPrice);
                              }
                            }} value={field.value}>
                            <SelectTrigger size="button" className="w-full h-34 "><SelectValue className="h-34" placeholder="Selecione uma refeição" /></SelectTrigger>
                            <SelectContent>
                              {meals.map((meal: Meal) => (
                                <SelectItem key={meal.id} value={meal.name}>{meal.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {
                        mealsArray[index]?.name === "Por quilo" &&
                        (
                          <div className="flex w-full flex-col justify-start gap-2">
                            <Label>Peso kg</Label>
                            <Input className="w-full" placeholder="Pesagem" type="number" step="0.010" value={peso} onChange={(e) => { calculatePricePerWeight(mealsArray[index]?.weekendPrice ?? "44,00", e.target.value, index) }} />
                          </div>
                        )

                      }


                      <Input {...register(`meals.${index}.weekendPrice`)} placeholder="Preço" type="number" readOnly hidden />
                      <Button type="button" onClick={() => removeMeal(index)} variant="destructive" className="flex justify-center w-full"><Trash2 /></Button>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={() => appendMeal({ name: "", price: "" })}>Adicionar Refeição</Button>
              </div>


              <Separator className="my-6" />

              {/* Other Items Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Outros Itens</h2>
                {otherItemFields.map((field, index) => {

                  const selectedType = productArray?.[index]?.type;
                  return (
                    <div className="border rounded-lg  mb-4">
                      <Badge variant={"outline"} className="mx-4 mt-2">R$ {productArray?.[index]?.price || "0,00"}</Badge>
                      <div key={field.id} className="flex flex-col md:flex-rowitems-center justify-between gap-2 p-3 ">
                        <div className="flex flex-col items-left gap-2">
                          <Controller
                            control={control}
                            name={`otherItems.${index}.type`}
                            render={({ field }) => (
                              <Select onValueChange={(value) => {
                                field.onChange(value);
                                setValue(`otherItems.${index}.name`, "");
                                setValue(`otherItems.${index}.price`, "");
                              }} value={field.value} >
                                <SelectTrigger size="button"><SelectValue placeholder="Tipo" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="sobremesa">Sobremesa</SelectItem>
                                  <SelectItem value="bebida-nao-alcolicas">Bebida não alcoólica</SelectItem>
                                  <SelectItem value="bebidas-alcolicas">Bebida alcoólica</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          <Controller
                            control={control}
                            name={`otherItems.${index}.name`}
                            render={({ field }) => (
                              <Select onValueChange={(value) => {
                                field.onChange(value);
                                const selectedProduct = products.find((p: Product) => p.name === value);
                                if (selectedProduct) {
                                  setValue(`otherItems.${index}.price`, selectedProduct.price);
                                }
                              }} value={field.value}>
                                <SelectTrigger size="button"><SelectValue placeholder="Selecione um item" /></SelectTrigger>
                                <SelectContent>
                                  {products
                                    .filter((p: Product) => p.type === selectedType)
                                    .map((product: Product) => (
                                      <SelectItem key={product.id} value={product.name}>{product.name}</SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>

                        <Input {...register(`otherItems.${index}.price`)} placeholder="Preço" type="number" step="0.01" hidden readOnly />
                        <Button type="button" onClick={() => removeOtherItem(index)} variant="destructive" className="flex justify-center"><Trash2 /></Button>
                      </div>
                    </div>
                  )
                })}
                <Button type="button" onClick={() => appendOtherItem({ name: "", price: "", type: "sobremesa" })}>Adicionar Outro Item</Button>
              </div>

              <Separator className="my-6" />
              <div className="flex gap-4 justify-end items-center">
                <Button className="flex gap-2 items-center" variant={"secondary"} onClick={(e) => { e.preventDefault(); navigate(-1) }}> <ArrowLeft></ArrowLeft> Voltar </Button>
                <Button type="submit" variant={"success"} className=" text-md flex gap-2">Salvar <Save></Save> </Button>
              </div>
            </form>
          </ScrollArea>
        </CardContent>



      </Card>



    </div>
  );
}
