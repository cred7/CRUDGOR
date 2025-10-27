import { useCallback } from "react";
import * as Yup from "yup";

export const useFieldValidation = (
  useSchema: Yup.AnyObjectSchema,
  data: any,
  setErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const handleBlur = useCallback(
    async (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name } = e.target;
      try {
        await useSchema.validateAt(name, data);
        setErrors((p) => ({ ...p, [name]: "" }));
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setErrors((prev) => ({
            ...prev,
            [name]: error.message,
          }));
        }
      }
    },
    [useSchema, data, setErrors]
  );

  return { handleBlur };
};
