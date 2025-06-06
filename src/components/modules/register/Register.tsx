/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
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
import { useRegisterUserMutation } from "../../../redux/auth/authApi";
import type { TResponse } from "../../../types/type";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [addRegisterUser] = useRegisterUserMutation();

  const formSchema = z.object({
    username: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
          "Password must contain a lowercase letter, a number, and a special character.",
      }),
    shops: z.array(
      z.object({
        name: z.string().min(1, "Shop name cannot be empty"),
      })
    ),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      shops: [{ name: "" }], // ✅ শুরুতে ১টা shop input
    },
  });

  const { append: appendShop, fields: shopsFields } = useFieldArray({
    control: form.control,
    name: "shops",
  });

  const addShops = () => {
    if (shopsFields.length < 4) {
      appendShop({ name: "" });
    }
  };

  const onSubmit = async (values: FormValues) => {
    const allShops = values.shops.map((shop) => shop.name);
    const userData = { ...values, shops: allShops };
    console.log(userData);
    try {
      const res = (await addRegisterUser(userData)) as TResponse<any>;
      console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.errorSources?.[0]?.message);
      } else {
        toast.success(res?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <div className="flex flex-col mb-10 items-center justify-center">
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Join us today and start your journey
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Username */}
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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Shop Fields */}
            <div>
              <div className="flex gap-5 items-center border-gray-300 border-t border-b py-3 my-5">
                <p className="text-primary font-bold text-xl">Shops Name</p>
                <Button
                  onClick={addShops}
                  disabled={shopsFields.length >= 4}
                  variant="outline"
                  className="size-10 cursor-pointer hover:bg-gray-300 border-gray-300"
                  type="button"
                >
                  <Plus className="text-primary border-gray-300" />
                </Button>
              </div>

              {shopsFields.map((shopField, index) => (
                <div key={shopField.id} className="mb-8">
                  <FormField
                    control={form.control}
                    name={`shops.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shop {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            {/* Submit */}
            <Button type="submit">Register</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
