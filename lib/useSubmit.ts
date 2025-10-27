import * as Yup from "yup";

export const useSubmit = (
  label: any,
  data: any,
  schema: Yup.AnyObjectSchema,
  seterror: any,
  setError: any,
  setAlertMessage: any
) => {
  const submission = async () => {
    try {
      await schema.validate(data);
      seterror((prev: any) => ({ ...prev, [label]: "" }));
      const endpointMap: Record<string, string> = {
        Player: "/api/player",
        News: "/api/news",
        Ticket: "/api/createticket",
      };

      const endpoint = endpointMap[label];
      if (!endpoint) throw new Error(`No endpoint found for label: ${label}`);
      // console.log(data);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errText = await response.text();
        // console.log(error, "heloloeleol");
        setError(`Failed to save ${label}: ${errText}`);
        setTimeout(() => setAlertMessage(null), 5000);
      }

      const result = await response.json();
      console.log(`✅ ${label} saved successfully:`, result);
      //   alert(`${label} saved successfully!`);
      setAlertMessage(result.message || `${label} saved successfully!`);
      setTimeout(() => setAlertMessage(null), 5000);
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        seterror((prev: any) => ({
          ...prev,
          [label]: error.message.slice(0, 33),
        }));
      }
      console.error(`🚨 Failed to save ${label}:`, error.message);
      setError(`Failed to save ${label}`);
      setTimeout(() => setError(null), 5000);
    }
  };
  return { submission };
};
