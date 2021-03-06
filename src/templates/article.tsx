import * as React from "react";

import { graphql } from "gatsby";

import Article from "../components/Article";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

import type { ArticleProps, SiteProps } from "../graphql";

type Props = ArticleProps & SiteProps;

const ArticlePage: React.FC<Props> = ({ data }: Props) => {
  const { title, date, tags } = data.mdx.frontmatter;
  const description = data.mdx.excerpt;
  const { slug } = data.mdx.fields;
  const meta = data.site.siteMetadata;

  return (
    <>
      <SEO
        description={description}
        pathname={slug}
        title={title}
        type="article"
      >
        <meta content={date} property="article:published_time" />
        {tags?.map((tag) => (
          <meta key={tag} content={tag} property="article:tag" />
        ))}

        <script type="application/ld+json">{`
          {
            "@context": "http://schema.org",
            "@type": "Blog",
            "name": "${meta.title}",
            "url": "${meta.siteUrl}",
            "description": "${meta.description}",
            "blogPost": {
              "@type": "BlogPosting",
              "headline": "${title}",
              "datePublished": "${date}",
              "description": "${description}",
              "url": "https://pers0n4.io${slug}"
            }
          }
        `}</script>
      </SEO>
      <Layout>
        <Article data={data} />
      </Layout>
    </>
  );
};

export default ArticlePage;

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      ...Article
    }
    site {
      ...SiteMetadata
    }
  }
`;
