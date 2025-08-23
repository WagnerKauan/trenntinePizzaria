import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCheckoutForm } from "../checkout-form";
import { Input } from "@/components/ui/input";


export function StepMethodPayment({ form }: { form: ReturnType<typeof useCheckoutForm> }) {

  const methodPayment = form.watch("methodPayment");

  return (
    <div className="space-y-4">
      <FormField 
        control={form.control}
        name="methodPayment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Forma de pagamento</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma forma de pagamento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                <SelectItem value="Cartão">Cartão</SelectItem>
                <SelectItem value="Pix">Pix</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {methodPayment === "Dinheiro" && (
        <FormField
          control={form.control}
          name="changeFor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor para troco</FormLabel>
              <FormControl>
                <Input placeholder="R$ 0,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}