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
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";

// using shadecn/ui is a UI library that uses tailwind for styling

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  // isLoading is renamed to isUserLoading
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Define the form
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Queries

  // Syntax: mutateAsync: createUserAccount is a way to rename mutateAsync to createUserAccount
  // userCreateAccountMutation returns mutateAsync and isLoading as a hook
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  // Submit handler
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    /**  await is used to wait for the createUserAccount function to finish before
     *   moving to the next line of code (async)
     *   createUserAccount is a mutation function from react-query and
     *   directly calls appwrite's createUserAccount function for us
     *   values is the form data that is passed to the createUserAccount function
     */
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: " Sign up failed 1. Please try again.",
      });
    }

    // signInAccount is a mutation function from react-query
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: " Sign up failed 2. Please try again.",
      });
    }
    console.log("newUser is", newUser, "new session success", session);
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      // navigate to the home page
      navigate("/");
    } else {
      return toast({
        title: "Sign up failed 3. Please try again.",
      });
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.png" alt="logo" className="w-20 h-20" />
        Snapshot
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-12">
          Sign up to see photos and videos from your friends.
        </p>
        {/* w-full makes input extend to the full width of the container */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {isCreatingUser || isSigningIn || isUserLoading ? (
              <div className="flex-center gap-2">
                {" "}
                <Loader /> Loading...
              </div>
            ) : (
              "Sign up"
            )}{" "}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default SignupForm;
