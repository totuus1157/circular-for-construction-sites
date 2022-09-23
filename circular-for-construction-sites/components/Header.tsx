import Head from "next/head";

export default function Header({ title }: { title: string }): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
