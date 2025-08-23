import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCheckoutForm } from "../checkout-form";
import { Input } from "@/components/ui/input";

export function StepEndereço({
  form,
}: {
  form: ReturnType<typeof useCheckoutForm>;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input placeholder="Rua, Avenida, Travessa..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input placeholder="00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="neighborhood"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bairro</FormLabel>
            <FormControl>
              <Input placeholder="Bairro" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="complement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Complemento</FormLabel>
            <FormControl>
              <Input placeholder="Complemento" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


      <div className="flex flex-col md:flex-row justify-between gap-4">
        <FormField
          control={form.control}
          name="referencePoint"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Ponto de Referência</FormLabel>
              <FormControl>
                <Input placeholder="Ponto de Referência" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="00000-000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
