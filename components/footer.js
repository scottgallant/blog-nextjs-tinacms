let currentYear = new Date().getFullYear()  // returns the current year

export default function Footer({ data }) {
    return (
        <footer className="bg-gray-200 mt-10 py-8 px-8 lg:px-0 dark:bg-gray-900 dark:text-gray-300">
            <div className="max-w-3xl mx-auto space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mt-8 hidden md:block">
                    <p className="text-base text-gray-400">&copy; {currentYear} {data.siteName}</p>
                    {/* <SocialLinks /> */}
                </div>
                <div>
                    {/* <Signup /> */}
                </div>
            </div>
        </footer>
    )
}
