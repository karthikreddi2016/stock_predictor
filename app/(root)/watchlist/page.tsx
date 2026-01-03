import TradingViewWidget from "@/components/TradingViewWidget";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";

const WatchlistPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const symbols = await getWatchlistSymbolsByEmail(session?.user?.email || "");

    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js`;

    const config = {
        title: "My Watchlist",
        width: "100%",
        height: 600,
        locale: "en",
        showSymbolLogo: true,
        colorTheme: "dark",
        isTransparent: false,
        backgroundColor: "#0F0F0F",
        symbolsGroups: [
            {
                name: "Watchlist",
                symbols: symbols.map(s => ({ name: s, displayName: s }))
            }
        ]
    };

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-gray-100">My Watchlist</h1>
            {symbols.length > 0 ? (
                <TradingViewWidget
                    scriptUrl={scriptUrl}
                    config={config}
                    height={600}
                />
            ) : (
                <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-gray-800 rounded-xl">
                    <p className="text-gray-500 text-lg">Your watchlist is empty.</p>
                    <p className="text-gray-600">Search for stocks to add them to your watchlist.</p>
                </div>
            )}
        </div>
    );
};

export default WatchlistPage;
