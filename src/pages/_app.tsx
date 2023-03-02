import { trpc } from "@/utlis/trpc";
import { AppType } from "next/app";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)