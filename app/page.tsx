import ContactCTA from "@/components/contacCTA";
import GithubActivity from "@/components/githubactivity";
import Hero from "@/components/hero";
import RecentBlog from "@/components/recent-blog-post";
import RecentCertifications from "@/components/recent-certification";
import RecentProjects from "@/components/recent-projects";
import ShopNewsletter from "@/components/shop-newsletter";

export default function Home() {
  return (
    <main className="mainpage">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-[100px]">
        <Hero />

        <RecentBlog />
        <RecentProjects/>
        <RecentCertifications/>
        <GithubActivity/>
        <ShopNewsletter/>
        <ContactCTA/>

        
      </div>
    </main>
  );
}