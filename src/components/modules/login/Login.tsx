/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useLoginMutation } from "../../../redux/auth/authApi";
import type { TResponse } from "../../../types/type";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";

const Login = () => {
  const navigate = useNavigate();
  const [addLogin] = useLoginMutation();
  const formSchema = z.object({
    username: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
          "Password must be at least 8 characters, contain at least one number, and one special character,",
      }),
    remember: z.boolean().optional(),
  });
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Alamin hasan",
      password: "Alamin!23",
      remember: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const res = (await addLogin(values)) as TResponse<any>;
      if (res?.error) {
        toast.error(res?.error?.data?.errorSources?.[0]?.message);
        console.log(res?.error);
      } else {
        toast.success(res?.data?.message);
        navigate("/login");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
          <div className="flex flex-col mb-10 items-center justify-center">
            <h2 className="text-2xl font-bold">Login to Your Account</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Welcome back! Please enter your credentials
            </p>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* =====================test=========== */}
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          id="remember"
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                        />
                      </FormControl>
                      <FormLabel htmlFor="remember" className="text-sm">
                        Remember Me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Button type="submit">Register</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
