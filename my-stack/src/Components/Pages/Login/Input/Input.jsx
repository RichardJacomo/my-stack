export const Input = ({ register }) => {
  return <input placeholder="Enter your email" {...register("email")} />;
};
