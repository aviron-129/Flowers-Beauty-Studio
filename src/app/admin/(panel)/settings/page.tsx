import { db } from "@/lib/db";
import { updateSiteSettings } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function AdminSettingsPage() {
  const settings = await db.siteSettings.findUnique({ where: { id: 1 } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Настройки сайта</h1>
      <Card>
        <CardHeader>
          <h2 className="font-medium text-slate-900">Основные данные</h2>
          <p className="text-sm text-slate-500">Отображаются на главной странице и в контактах</p>
        </CardHeader>
        <CardContent>
          <form action={updateSiteSettings} className="space-y-4 max-w-xl">
            <div className="space-y-2">
              <Label htmlFor="siteName">Название магазина</Label>
              <Input id="siteName" name="siteName" defaultValue={settings?.siteName ?? ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Hero-заголовок</Label>
              <Input id="heroTitle" name="heroTitle" defaultValue={settings?.heroTitle ?? ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroText">Hero-текст</Label>
              <Textarea id="heroText" name="heroText" rows={3} defaultValue={settings?.heroText ?? ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" name="phone" defaultValue={settings?.phone ?? ""} placeholder="+74951234567" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Адрес</Label>
              <Input id="address" name="address" defaultValue={settings?.address ?? ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp (ссылка)</Label>
              <Input id="whatsapp" name="whatsapp" defaultValue={settings?.whatsapp ?? ""} placeholder="https://wa.me/..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram (ссылка)</Label>
              <Input id="telegram" name="telegram" defaultValue={settings?.telegram ?? ""} placeholder="https://t.me/..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram (ссылка)</Label>
              <Input id="instagram" name="instagram" defaultValue={settings?.instagram ?? ""} placeholder="https://instagram.com/..." />
            </div>
            <Button type="submit">Сохранить настройки</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
