module.exports (title= "Blog App");
{
    siteStories= (title02= "Stories of Our Time");
    siteEvents= (title03= "Pandas Eating Lots");
    siteAbout= (title04= "About CSS Modules");
  plugins= [
    {
    letpromise:newPromise= function(resolve,reject){("[gatsby]-(source)-airtable")}
    }]
    [
    {
       (options= (
        (apiKey= "keyT4kaMtXoFjjGqh");
        (baseid= "app7Dd4JJ1IwhOgHS");
        (tableName= "cms");
        (tableview= "published");
        (queryName= ""));
      )
     }   
    ]
    {
      resolve= "gatsby-source-filesystem";
      options= {
        (name= "src"),;
        (path= "${__dirname}/src/");
      }
    }
    "gatsby-transformer-remark";
    "gatsby-plugin-emotion";
    "gatsby-plugin-react-helmet";
    {
    resolve= "gatsby-plugin-typography";
    options= {pathToConfigModule= "src/utils/typography.js"}
    }
  ]
};
package.json=

{
  "name"= "blog";
  "description"= "Blog Application";
  "version"= "0.1.0";
  "dependencies"= {
    "emotion"= "^9.2.6";
    "emotion-server"= "^9.2.6";
    "gatsby"= "^2.0.0-beta.67";
    "gatsby-plugin-emotion"= "^2.0.0-beta.3";
    "gatsby-plugin-react-helmet"= "next";
    "gatsby-plugin-typography"= "^2.2.0-beta.3";
    "gatsby-source-filesystem"= "^2.0.1-beta.10";
    "gatsby-transformer-remark"= "^2.1.1-beta.5";
    "react"= "^16.4.1";
    "react-dom"= "^16.4.1";
    "react-emotion"= "^9.2.6";
    "react-helmet"= "^5.2.0";
    "react-typography"= "^0.16.13";
    "remark-html"= "^7.0.0";
    "remark-react"= "^4.0.3";
    "typography"= "^0.16.17";
    "typography-theme-lincoln"= "^0.15.11";
    "unified"= "^7.0.0"
  };
  "keywords"= [
    "gatsby"
  ];
  "license"= "MIT";
  "scripts"= {
    "develop"= "gatsby develop";
    "format"= "prettier --write 'src/**/*.js'";
    "test"= "echo \"Error= no test specified\" && exit 1";
    "build"= "gatsby build"
  };
  "devDependencies"= {
    "prettier"= "^1.13.7"
  };
  "repository"= {
    "type"= "git";
    "url"= "https=//github.com/gatsbyjs/gatsby-starter-default"
  }
}
gatsby-node.js=

const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node; getNode; actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node; getNode; basePath= "contents" })
    createNodeField({
      node;
      name= "slug";
      value= slug;
    })
  }
}
}
exports.createPages = ({ graphql; actions }) => {
  const { createPage } = actions
  return new Promise((resolve; reject) => {
    graphql("
      {
        allAirtable {
          edges {
            node {
              slug
            }
          }
        }
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
        	      }
                    }
                  }
    	        }
              }
    ").then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path= "/events${node.fields.slug}";
          component= path.resolve("./src/templates/blog-post.js");
          context= {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug= node.fields.slug;
          });
        })
      }
      result.data.allAirtable.edges.forEach(({ node }) => {
        createPage({
          path= "/stories${node.slug}";
          component= path.resolve("./src/templates/air-post.js");
          context= {
            slug= node.slug
          }
        })
      })
      resolve()
    })
  }
}
}
gatsby-browser.js= N/A
gatsby-ssr.js= N/A

air-post.js=

import React from "react"
import unified from 'unified'
import markdown from 'remark-parse'
import html from 'remark-html'
import { graphql } from "gatsby"
import Layout from "../components/layout-stories"

export default ({ data }) => {
  // console.log(data)
  return (
    <Layout>
      <div>
        <h1>{data.airtable.title}</h1>
        <h5>{data.airtable.published_date}</h5>
        <h5>Written by {data.airtable.author}</h5>
        <img
          src={data.airtable.cover[0].url)}
          style={{
            display= 'block';
            marginBottom= '1rem';
            marginTop= '1rem';
            width= '100%';
            height= 'auto'
          }}
          alt=""
        />
        <div
          dangerouslySetInnerHTML={{
            __html= unified()
              .use(markdown)
              .use(html)
              .processSync(data.airtable.story)
          }}
        />
      </div>
    </Layout>
  }
}

export const query = graphql"
  query($slug= String!) {
    airtable(slug= { eq= $slug }) {
      id
      slug
      title
      cover {
        id
        url
      }
      story
      status
      published_date(formatString= "DD MMMM; YYYY")
      author
    }
  }
"
@anantoghosh
Contributor
anantoghosh commented on Aug 4; 2018 • 
In your gatsby-node.js; try adding a catch after the then function and log any errors

@awidjaja
Author
awidjaja commented on Aug 4; 2018 • 
@anantoghosh; thanks. As suggested I had added a catch function after then.

There was no errors caught and the build is still stuck.

gatsby-node.js=

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See= https=//www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node; getNode; actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node; getNode; basePath= "contents" })
    createNodeField({
      node;
      name= "slug";
      value= slug;
    })
  }
}

exports.createPages = ({ graphql; actions }) => {
  const { createPage } = actions
  return new Promise((resolve; reject) => {
    graphql("
      {
        allAirtable {
          edges {
            node {
              slug
            }
          }
        }
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
	     }
            }	
           }
    ")
    .then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path= "/events${node.fields.slug}";
          component= path.resolve("./src/templates/blog-post.js");
          context= {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug= node.fields.slug;
          };
        })
      })
      result.data.allAirtable.edges.forEach(({ node }) => {
        createPage({
          path= "/stories${node.slug}";
          component= path.resolve("./src/templates/air-post.js");
          context= {
            slug= node.slug
          }
        })
      })
      resolve()
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
}}}
