import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SigninValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";

// using shadecn/ui is a UI library that uses tailwind for styling

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  // isLoading is renamed to isUserLoading
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Define the form
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: signInAccount } = useSignInAccount();

  // Submit handler
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    // signInAccount is a mutation function from react-query
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: " Sign in failed 1. Please try again.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      // navigate to the home page
      navigate("/");
    } else {
      return toast({
        title: "Sign in failed 2. Please try again.",
      });
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.png" alt="logo" className="w-20 h-20" />
        Snapshot
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log into your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-12">
          Log in to see photos and videos from your friends.
        </p>
        {/* w-full makes input extend to the full width of the container */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                {" "}
                <Loader /> Loading...
              </div>
            ) : (
              "Sign in"
            )}{" "}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default SigninForm;
