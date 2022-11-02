import { Layout } from "../../components/Layout";
import Image from 'next/image';
import { useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { CaptionedImage } from "../../components/mdx-components/captionedImage";
import { PullQuote } from "../../components/mdx-components/pullQuote";
// import { Tweet } from "../../components/mdx-components/tweet";
import { TextBox } from "../../components/mdx-components/textBox";
import { formatDate } from "../../utils/helpers";

export default function Home(props) {

  const mdxComponents = {
    CaptionedImage, PullQuote, TextBox,
    // Tweet: (props) => {
    //   // console.log(props)
    //   return <Tweet tweetId={props.tweetId} />;
    // },
  };

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      {data.post.advanced.image &&
        <div className="h-80 relative ">
          <Image
            src={data.post.advanced.image}
            alt={data.post.title}
            width={920}
            height={380}
          />
        </div>
      }
      <div className="prose">
        <h1>{data.post.title}</h1>
        <div>{data.post.advanced.date}</div>
        <TinaMarkdown content={data.post.body} components={mdxComponents} />
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.postConnection();
  const paths = data.postConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const { data, query, variables } = await client.queries.post({
    relativePath: ctx.params.slug + ".mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};


// import { Layout } from "../../components/Layout";
// import { useTina } from "tinacms/dist/react";
// import { client } from "../../.tina/__generated__/client";

// export default function Home(props) {
//   // data passes though in production mode and data is updated to the sidebar data in edit-mode
//   const { data } = useTina({
//     query: props.query,
//     variables: props.variables,
//     data: props.data,
//   });

//   return (
//     <Layout>
//       <code>
//         <pre
//           style={{
//             backgroundColor: "lightgray",
//           }}
//         >
//           {JSON.stringify(data.post, null, 2)}
//         </pre>
//       </code>
//     </Layout>
//   );
// }

// export const getStaticPaths = async () => {
//   const { data } = await client.queries.postConnection();
//   const paths = data.postConnection.edges.map((x) => {
//     return { params: { slug: x.node._sys.filename } };
//   });

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

// export const getStaticProps = async (ctx) => {
//   const { data, query, variables } = await client.queries.post({
//     relativePath: ctx.params.slug + ".mdx",
//   });

//   return {
//     props: {
//       data,
//       query,
//       variables,
//     },
//   };
// };
