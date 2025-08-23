import { Textarea } from "@/components/ui/textarea"
import { useCheckoutForm } from "../checkout-form";
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";


export function StepObservations({ form }: { form: ReturnType<typeof useCheckoutForm> }) {
  return (
    
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações</FormLabel>
            <FormControl>
              <Textarea placeholder="Alguma observação? ex: tirar cebola..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />
    </div>
  )
}
