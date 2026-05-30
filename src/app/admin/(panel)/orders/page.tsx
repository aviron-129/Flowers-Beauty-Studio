import { db } from "@/lib/db";
import { updateOrderStatusFromForm, deleteOrder } from "@/app/admin/actions";
import { Badge, orderStatusLabels, orderStatusVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ORDER_STATUSES } from "@/types/order";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Заявки с сайта</h1>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-slate-500">Заявок пока нет</CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-semibold text-slate-900">{order.name}</span>
                      <Badge variant={orderStatusVariant[order.status]}>{orderStatusLabels[order.status]}</Badge>
                      <span className="text-xs text-slate-400">
                        #{order.id} · {new Date(order.createdAt).toLocaleString("ru-RU")}
                      </span>
                    </div>
                    <p className="text-sm">
                      <span className="text-slate-500">Телефон:</span>{" "}
                      <a href={`tel:${order.phone}`} className="text-sage-700">
                        {order.phone}
                      </a>
                    </p>
                    {order.occasion && (
                      <p className="text-sm">
                        <span className="text-slate-500">Повод:</span> {order.occasion}
                      </p>
                    )}
                    {order.budget && (
                      <p className="text-sm">
                        <span className="text-slate-500">Бюджет:</span> {order.budget}
                      </p>
                    )}
                    {order.comment && (
                      <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 mt-2">{order.comment}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 shrink-0 min-w-[180px]">
                    <form action={updateOrderStatusFromForm}>
                      <input type="hidden" name="orderId" value={order.id} />
                      <select
                        name="status"
                        defaultValue={order.status}
                        className="text-sm rounded-lg border border-slate-200 px-3 py-2 w-full mb-2"
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {orderStatusLabels[s]}
                          </option>
                        ))}
                      </select>
                      <Button type="submit" size="sm" variant="secondary" className="w-full">
                        Обновить статус
                      </Button>
                    </form>
                    <form action={deleteOrder.bind(null, order.id)}>
                      <Button type="submit" size="sm" variant="outline" className="w-full text-red-600">
                        Удалить
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
