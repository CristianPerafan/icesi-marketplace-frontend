

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-2 py-4 md:py-4 md:flex-row ">
			<div className="inline-block max-w-lg text-left justify-left">
				<div className="flex justify-left space-x-2 ">
					<h1 className="text-4xl lg:text-6xl">Tu</h1>
					<h1 className="text-4xl lg:text-6xl text-blue-700"> Comunidad,</h1>
				</div>
				<h1 className="text-4xl lg:text-6xl">
					tus products.
				</h1>
				<br />

				<p className="text-lg lg:text-xl text-default-600 block max-w-full">
					Descubre la tienda virtual de nuestra universidad: donde la comunidad vende y compra.
				</p>

			</div>



			<div className="flex gap-3">
				<img className="" src="https://demo.themesberg.com/landwind/images/hero.png"></img>
			</div>

			<div className="mt-8">
			</div>
		</section>
	);
}
