import Container from "@/components/container";
import SectionHeading from "@/components/section-heading";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { latestBlogPosts } from "@/data/data";
//method call
const LatestBlogs = () => {
  return (
    <div id="blog" className="bg-white text-bg-dark">
      <Container className="py-section">
        <SectionHeading>
          <h2 className="uppercase text-center">READ OUR LATEST BLOG</h2>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {latestBlogPosts.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </Container>
    </div>
  );
};
//method call 
const BlogCard = ({ blog }) => {
  return (
    <article
      data-aos="zoom-in-up"
      className="flex font-kumbhSans font-normal cursor-pointer group flex-col gap-2"
    >
      <div className="w-full transition-all relative h-[260px] group-hover:h-[370px] duration-500 isolate ">
        <div className="bg-lime z-10 bg-opacity-90 transition-all opacity-0 group-hover:opacity-90 absolute inset-0 grid place-content-center duration-500 p-2">
          <FaArrowRight className="-rotate-45 text-3xl group-hover:fill-white transition-all" />
        </div>
        <Image
          src={blog.image}
          fill
          alt={blog.title}
          className="w-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-sm text-cyan">
          {blog.publishAt} _ {blog.category}
        </div>
        <h5 className="text-xl font-bold my-4 mb-6 line-clamp-2">
          {blog.title}
        </h5>

        <div className="flex text-bg-dark text-base font-medium uppercase items-center gap-2 transition-all group-hover:text-lime">
          Read more
        </div>
      </div>
    </article>
  );
};

export default LatestBlogs;
