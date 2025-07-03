import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const API_BASE = "http://localhost:8000/api";

const sections = [
  { key: "projects", label: "پروژه‌ها" },
  { key: "about", label: "درباره من" },
  { key: "book-session", label: "رزرو جلسه" },
  { key: "contact", label: "تماس با ما" },
  { key: "hero", label: "هیرو" },
  { key: "skills", label: "مهارت‌ها" },
  { key: "work-experience", label: "سوابق کاری" },
  { key: "writings", label: "نوشته‌ها" },
];

// تعریف فیلدهای هر بخش بر اساس مدل‌های backend
const sectionFields: Record<string, string[]> = {
  projects: ["id", "title", "description", "link", "image"],
  about: ["id", "title", "description", "image"],
  "book-session": ["id", "name", "email", "message", "date"],
  contact: ["id", "name", "email", "message"],
  hero: ["id", "title", "subtitle", "image"],
  skills: ["id", "name", "level", "category", "icon"],
  "work-experience": ["id", "title", "company", "start_date", "end_date", "description", "location"],
  writings: ["id", "title", "content", "date", "link"],
};

const AdminPanel = () => {
  const { toast } = useToast();
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState(sections[0].key);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/token/`, {
        username,
        password,
      });
      setToken(res.data.access);
      toast({ title: "ورود موفقیت‌آمیز بود!", description: "شما وارد پنل مدیریت شدید." });
    } catch (err: any) {
      setError("نام کاربری یا رمز عبور اشتباه است.");
      toast({ title: "خطا در ورود!", description: "نام کاربری یا رمز عبور اشتباه است.", variant: "destructive" });
    }
  };

  const fetchSection = async (section: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/${section}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prev: any) => ({ ...prev, [section]: res.data }));
    } catch (err: any) {
      setError("دریافت اطلاعات با خطا مواجه شد.");
      toast({ title: "خطا!", description: "دریافت اطلاعات با خطا مواجه شد.", variant: "destructive" });
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (token) fetchSection(activeTab);
    // eslint-disable-next-line
  }, [token, activeTab]);

  const handleDelete = async (id: number | string) => {
    if (!window.confirm("آیا از حذف مطمئن هستید؟")) return;
    setLoading(true);
    setError("");
    try {
      await axios.delete(`${API_BASE}/${activeTab}/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSection(activeTab);
      toast({ title: "حذف شد!", description: "آیتم با موفقیت حذف شد." });
    } catch (err: any) {
      setError("حذف با خطا مواجه شد.");
      toast({ title: "خطا!", description: "حذف با خطا مواجه شد.", variant: "destructive" });
    }
    setLoading(false);
  };

  const handleEdit = (item: any) => {
    setForm(item);
    setEditItem(item);
    setFormMode("edit");
    setShowForm(true);
  };

  const handleAdd = () => {
    const fields = data[activeTab]?.[0] || {};
    const emptyForm: any = {};
    Object.keys(fields).forEach(f => (emptyForm[f] = ""));
    setForm(emptyForm);
    setEditItem(null);
    setFormMode("add");
    setShowForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let submitData = { ...form };
      if (formMode === "add") {
        delete submitData.id;
      }
      if (formMode === "add") {
        await axios.post(`${API_BASE}/${activeTab}/`, submitData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({ title: "ثبت شد!", description: "آیتم جدید با موفقیت افزوده شد." });
      } else if (formMode === "edit" && editItem) {
        await axios.put(`${API_BASE}/${activeTab}/${editItem.id}/`, submitData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({ title: "ذخیره شد!", description: "تغییرات با موفقیت ذخیره شد." });
      }
      setShowForm(false);
      fetchSection(activeTab);
    } catch (err: any) {
      const serverError = err.response?.data
        ? typeof err.response.data === "string"
          ? err.response.data
          : JSON.stringify(err.response.data)
        : "ثبت اطلاعات با خطا مواجه شد.";
      setError(serverError);
      toast({ title: "خطا!", description: serverError, variant: "destructive" });
    }
    setLoading(false);
  };

  if (!token)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-center">ورود ادمین</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="text"
                placeholder="نام کاربری"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
              />
              <Input
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <Button className="w-full" type="submit">ورود</Button>
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>خطا</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    );

  const fields = sectionFields[activeTab] || (data[activeTab]?.[0] ? Object.keys(data[activeTab][0]) : []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-10">
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">پنل مدیریت سایت</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 flex flex-wrap gap-2 justify-center">
              {sections.map(s => (
                <TabsTrigger key={s.key} value={s.key} className="font-mono">
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {sections.map(s => (
              <TabsContent key={s.key} value={s.key} className="w-full">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-end">
                    <Button onClick={handleAdd} className="mb-2" variant="secondary">
                      افزودن {s.label}
                    </Button>
                  </div>
                  {showForm && (
                    <form onSubmit={handleFormSubmit} className="bg-muted rounded-lg p-6 mb-4 flex flex-col gap-4">
                      {fields.map(f => {
                        // برای فیلدهای خاص، input مناسب نمایش دهیم
                        if (activeTab === "skills" && f === "category") {
                          return (
                            <div key={f} className="flex flex-col gap-1">
                              <label className="font-mono text-xs text-muted-foreground">{f}</label>
                              <select
                                name={f}
                                value={form[f] || "technical"}
                                onChange={handleFormChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="technical">Technical</option>
                                <option value="soft">Soft</option>
                              </select>
                            </div>
                          );
                        }
                        
                        if (activeTab === "skills" && f === "level") {
                          return (
                            <div key={f} className="flex flex-col gap-1">
                              <label className="font-mono text-xs text-muted-foreground">{f} (0-100)</label>
                              <Input
                                name={f}
                                type="number"
                                min="0"
                                max="100"
                                value={form[f] || ""}
                                onChange={handleFormChange}
                                required={f !== "id"}
                              />
                            </div>
                          );
                        }
                        
                        return (
                          <div key={f} className="flex flex-col gap-1">
                            <label className="font-mono text-xs text-muted-foreground">{f}</label>
                            {f === "id" ? (
                              <Input name={f} value={form[f] || ""} disabled />
                            ) : (
                              <Input
                                name={f}
                                value={form[f] || ""}
                                onChange={handleFormChange}
                                required={f !== "id"}
                              />
                            )}
                          </div>
                        );
                      })}
                      <div className="flex gap-2 mt-2">
                        <Button type="submit" className="w-32">
                          {formMode === "add" ? "افزودن" : "ذخیره"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="w-32">
                          انصراف
                        </Button>
                      </div>
                    </form>
                  )}
                  {loading ? (
                    <div className="text-center py-8 font-mono">در حال بارگذاری...</div>
                  ) : error ? (
                    <Alert variant="destructive">
                      <AlertTitle>خطا</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  ) : (
                    <div className="overflow-x-auto rounded-lg border">
                      <table className="min-w-full bg-card text-card-foreground font-mono text-sm">
                        <thead>
                          <tr>
                            {fields.map(f => (
                              <th key={f} className="px-3 py-2 border-b text-left font-bold text-muted-foreground">{f}</th>
                            ))}
                            <th className="px-3 py-2 border-b text-left">عملیات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data[s.key]?.map((item: any) => (
                            <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                              {fields.map(f => (
                                <td key={f} className="px-3 py-2 border-b">{item[f]}</td>
                              ))}
                              <td className="px-3 py-2 border-b">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="ml-2">ویرایش</Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>حذف</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel; 