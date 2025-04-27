import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Login Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Proszę podać poprawny adres email" }),
  password: z.string().min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
});

// Registration Schema
const registerSchema = z.object({
  username: z.string().min(3, { message: "Imię musi mieć co najmniej 3 znaki" }),
  email: z.string().email({ message: "Proszę podać poprawny adres email" }),
  password: z.string().min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // If user is already logged in, redirect to home page
  if (user) {
    navigate("/profile");
    return null;
  }

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Registration form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Handle login submission
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await loginMutation.mutateAsync(values);
      toast({
        title: "Sukces!",
        description: "Zostałeś pomyślnie zalogowany.",
      });
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Błąd logowania",
        description: "Nieprawidłowy email lub hasło. Spróbuj ponownie.",
        variant: "destructive",
      });
    }
  };

  // Handle registration submission
  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await registerMutation.mutateAsync(values);
      toast({
        title: "Rejestracja udana!",
        description: "Twoje konto zostało pomyślnie utworzone.",
      });
      navigate("/profile");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Błąd rejestracji",
        description: error.message || "Nie można utworzyć konta. Spróbuj ponownie.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl">
        {/* Left panel - Form */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-950 p-8">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600">
              Aurum Affirmations
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Twoja droga do wewnętrznej transformacji
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="text-base">
                Logowanie
              </TabsTrigger>
              <TabsTrigger value="register" className="text-base">
                Rejestracja
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Zaloguj się</CardTitle>
                  <CardDescription>
                    Zaloguj się, aby uzyskać dostęp do swojego konta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form
                      onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="twoj@email.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hasło</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="********"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Logowanie..." : "Zaloguj się"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <div className="text-sm text-center">
                    <a href="#" className="text-amber-600 hover:text-amber-800">
                      Zapomniałeś hasła?
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Registration Form */}
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Utwórz konto</CardTitle>
                  <CardDescription>
                    Zarejestruj się, aby rozpocząć swoją podróż z Aurum Affirmations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registerForm}>
                    <form
                      onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Imię</FormLabel>
                            <FormControl>
                              <Input placeholder="Jan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="twoj@email.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hasło</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="********"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending
                          ? "Rejestracja..."
                          : "Zarejestruj się"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right panel - Hero Section */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-amber-800 to-amber-950 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-60"></div>
          
          <div className="z-10 text-center">
            <h2 className="text-4xl font-bold mb-6 text-amber-300">
              Odkryj swój wewnętrzny potencjał
            </h2>
            <p className="text-lg mb-8 text-amber-100">
              Uzyskaj dostęp do ekskluzywnych treści, codziennych afirmacji,
              szczegółowych horoskopów i profesjonalnych analiz numerologicznych.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-500 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Codzienne afirmacje dla transformacji życia</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-amber-500 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Szczegółowe analizy horoskopowe</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-amber-500 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Indywidualne prognozy numerologiczne</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-amber-400 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-amber-600 rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  );
}