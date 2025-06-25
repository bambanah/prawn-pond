import Hero from "@/components/molecules/hero";
import MemoryList from "@/components/organisms/memory-list";
import Layout from "@/components/templates/layout";
import { MemoryContextProvider } from "@/context/memory-context";

const Home = () => (
	<Layout>
		<Hero />

		<MemoryContextProvider>
			<div className="flex flex-col justify-start items-center pb-12 w-full mt-[90vh] bg-background">
				<MemoryList />
			</div>
		</MemoryContextProvider>
	</Layout>
);

export default Home;
