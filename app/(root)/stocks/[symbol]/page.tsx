import TradingViewWidget from "@/components/TradingViewWidget";
import {
    SYMBOL_INFO_WIDGET_CONFIG,
    CANDLE_CHART_WIDGET_CONFIG,
    TECHNICAL_ANALYSIS_WIDGET_CONFIG,
    COMPANY_PROFILE_WIDGET_CONFIG,
    COMPANY_FINANCIALS_WIDGET_CONFIG
} from "@/lib/constants";

const StockPage = async ({ params }: { params: Promise<{ symbol: string }> }) => {
    const { symbol } = await params;
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8 bg-[#050505] min-h-screen">
            <section className="w-full">
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}symbol-info.js`}
                    config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
                    height={170}
                />
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}advanced-chart.js`}
                        config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
                        height={600}
                    />
                </div>
                <div className="xl:col-span-1">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}technical-analysis.js`}
                        config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
                        height={400}
                    />
                </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}symbol-profile.js`}
                    config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
                    height={440}
                />
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}financials.js`}
                    config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
                    height={464}
                />
            </section>
        </div>
    );
};

export default StockPage;
