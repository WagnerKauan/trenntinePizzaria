"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { CardOrder } from "./card-order";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Order } from "@/generated/prisma";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo, useState } from "react";
import { updateStatusOrder } from "../_actions/update-status-order";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { ButtonPickerOrder } from "./button-date";

export function OrdersList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-orders", date],

    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), "yyyy-MM-dd");
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/trentinne/orders?date=${activeDate}`;
      const response = await fetch(url);
      const json = (await response.json()) as Order[];

      if (!response.ok) {
        return [];
      }

      return json;
    },
    staleTime: 20000,
    refetchInterval: 60000,
  });

  const filteredOrders = useMemo(() => {
    if(!data) return [];

    let result = data;

    if(status !== "ALL") {
      result = result.filter((order) => order.status === status);
    }

    if(search) {
      result = result.filter((order) => order.name.toLowerCase().includes(search.toLowerCase()));
    }

    return result;
  }, [status, search, data]);

  function handleSearch(value: string) {
    setSearch(value);
  }

  function selectOrderStatus(value: string) {
    setStatus(value);
  }

  async function handleUpdateStatus(id: string, status: string) {
    const response = await updateStatusOrder({ id, status });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    router.refresh();
    queryClient.invalidateQueries({ queryKey: ["get-orders"] });
    await refetch();
    toast.success(response.message);
  }

  return (
    <section className="mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-dark-normal text-xl font-semibold">
            Pedidos
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className=" flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3 sm:gap-10 flex-wrap">
              <div className="relative w-full flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  type="search"
                  placeholder="Pesquisar pedidos..."
                  className="pl-10 w-full flex-1 focus-visible:ring-2 focus-visible:ring-primary
                      focus-visible:ring-offset-1 focus-visible:border-transparent"
                  onChange={(e) => handleSearch(e.target.value)}
                  value={search}
                />
              </div>
              <Select defaultValue={status} onValueChange={selectOrderStatus}>
                <SelectTrigger className="w-full max-w-[150px] xl:max-w-xs">
                  <SelectValue placeholder="Filtrar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todos</SelectItem>
                  <SelectItem value="PENDING">Aguardando</SelectItem>
                  <SelectItem value="PREPARATION">Em preparo</SelectItem>
                  <SelectItem value="CONCLUDED">Finalizado</SelectItem>
                  <SelectItem value="CANCELED">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <ButtonPickerOrder />
            </div>
          </div>

          <ScrollArea className="h-[650px] px-4  mt-10">
            <section className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {isLoading && <p>Carregando...</p>}
              {!isLoading && filteredOrders?.length === 0 && (
                <p>Nenhum pedido encontrado</p>
              )}
              {filteredOrders?.map((order) => (
                <CardOrder
                  key={order.id}
                  order={order}
                  handleUpdateStatus={handleUpdateStatus}
                />
              ))}
            </section>
          </ScrollArea>
        </CardContent>
      </Card>
    </section>
  );
}
