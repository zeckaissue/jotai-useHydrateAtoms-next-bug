import { GetStaticPaths, GetStaticProps } from "next";
import { useHydrateAtoms } from 'jotai/utils';
import { localeAtom, slugAtom } from "@/jotai.demo";
import { useAtomValue } from "jotai";

interface SlugPageProps {
    slug: string,
}
export default function Slug({slug}: SlugPageProps) {
  useHydrateAtoms([
    [slugAtom, slug],
  ])
  const slugValue = useAtomValue(slugAtom)
    return (
      <>
        <div>slugValue: { slugValue}</div>
      </>
  )
}


export const getStaticProps: GetStaticProps<SlugPageProps> = async ({ locale, params }) => {
  if (locale === 'default') {
    return {
      notFound: true,
    };
  }
const slug = params?.slug as string ?? '';

  return {
    revalidate: 60,
    props: {
        slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
        { params: {slug: 'test1'}},
        {params: {slug: 'test1'}},
        { params: {slug: 'test2'}},
        { params: {slug: 'test2'}},
    ],
    fallback: 'blocking',
  };
};
