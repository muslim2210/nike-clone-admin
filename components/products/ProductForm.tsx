"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useParams, useRouter } from "next/navigation";
import Delete from "../custom ui/Delete";
import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";
import Loader from "../custom ui/Loader";

const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: ProductType | null; //Must have "?" to make it optional
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const router = useRouter();

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          collections: initialData.collections.map(
            (collection) => collection._id
          ),
        }
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0.1,
          expense: 0.1,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Product ${initialData ? "Updated" : "Created"}!`);
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (err) {
      console.log("[products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="py-12 px-5 md:px-24">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold text-primaryBlack font-uniqlo">
            Edit Product
          </p>
          <Delete id={initialData._id} item="product" />
        </div>
      ) : (
        <p className="text-heading2-bold text-primaryBlack font-uniqlo">
          Create Product
        </p>
      )}
      <Separator className="bg-primaryBlack mt-4 mb-7" />
      <div className="max-w-[600px] lg:max-w-[900px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insert title.."
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Insert Description.."
                      {...field}
                      rows={5}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) =>
                        field.onChange(
                          [...field.value].filter((image) => image !== url)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (Rp)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Insert Price.."
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense (Rp)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Insert Expense.."
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Insert category.."
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Insert tags.."
                        value={field.value}
                        onChange={(tag) =>
                          field.onChange([...field.value, tag])
                        }
                        onRemove={(tagToRemove) =>
                          field.onChange(
                            [...field.value].filter(
                              (tag) => tag !== tagToRemove
                            )
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {collections.length > 0 && (
                <FormField
                  control={form.control}
                  name="collections"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collections</FormLabel>
                      <FormControl>
                        <MultiSelect
                          collections={collections}
                          placeholder="Insert Collections.."
                          value={field.value}
                          onChange={(_id) =>
                            field.onChange([...field.value, _id])
                          }
                          onRemove={(idToRemove) =>
                            field.onChange(
                              [...field.value].filter(
                                (collectionId) => collectionId !== idToRemove
                              )
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colors</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Insert Colors.."
                        value={field.value}
                        onChange={(color) =>
                          field.onChange([...field.value, color])
                        }
                        onRemove={(colorToRemove) =>
                          field.onChange(
                            [...field.value].filter(
                              (color) => color !== colorToRemove
                            )
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Insert sizes.."
                        value={field.value}
                        onChange={(size) =>
                          field.onChange([...field.value, size])
                        }
                        onRemove={(sizeToRemove) =>
                          field.onChange(
                            [...field.value].filter(
                              (size) => size !== sizeToRemove
                            )
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-10">
              <Button
                type="button"
                onClick={() => router.push("/collections")}
                className="bg-slate-200 text-primaryBlack"
              >
                Discard
              </Button>
              <Button type="submit" className="bg-primaryBlack text-white">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
