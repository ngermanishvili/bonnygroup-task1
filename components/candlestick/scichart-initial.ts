import {
    SciChartSurface,
    DateTimeNumericAxis,
    NumberRange,
    OhlcDataSeries,
    FastCandlestickRenderableSeries,
    FastOhlcRenderableSeries,
    XyMovingAverageFilter,
    FastLineRenderableSeries,
    FastColumnRenderableSeries,
    XyDataSeries,
    EAutoRange,
    CursorModifier,
    ENumericFormat,
    MouseWheelZoomModifier,
    NumericAxis,
    ZoomExtentsModifier,
    ZoomPanModifier
} from "scichart";
import { appTheme, simpleBinanceRestClient } from "scichart-example-dependencies";
import { getTooltipLegendTemplate, VolumePaletteProvider } from "@/components/candlestick/utility";

const divElementId = "chart";
const Y_AXIS_VOLUME_ID = "Y_AXIS_VOLUME_ID";

export const drawExample = async (coinId: string) => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(divElementId, {
        theme: appTheme.SciChartJsTheme
    });
    SciChartSurface.setRuntimeLicenseKey(process.env.LICENSE_KEY || "");

    function updateChartWithData(priceBars: import("scichart-example-dependencies").TPriceBar[]) {
        if (!priceBars || priceBars.length === 0) return;

        const xValues: number[] = [];
        const openValues: number[] = [];
        const highValues: number[] = [];
        const lowValues: number[] = [];
        const closeValues: number[] = [];
        const volumeValues: number[] = [];
        priceBars.forEach((priceBar) => {
            xValues.push(priceBar.date);
            openValues.push(priceBar.open);
            highValues.push(priceBar.high);
            lowValues.push(priceBar.low);
            closeValues.push(priceBar.close);
            volumeValues.push(priceBar.volume);
        });

        const candleDataSeries = new OhlcDataSeries(wasmContext, {
            xValues,
            openValues,
            highValues,
            lowValues,
            closeValues,
            dataSeriesName: "Price Series"
        });

        candleDataSeries.clear();
        for (let i = 0; i < priceBars.length; i++) {
            candleDataSeries.append(
                priceBars[i].date,
                priceBars[i].open,
                priceBars[i].high,
                priceBars[i].low,
                priceBars[i].close
            );
        }

        sciChartSurface.invalidateElement();
    }

    const xAxis = new DateTimeNumericAxis(wasmContext, {
        autoRange: EAutoRange.Never
    });
    sciChartSurface.xAxes.add(xAxis);

    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, {
            growBy: new NumberRange(0.1, 0.1),
            labelFormat: ENumericFormat.Decimal,
            labelPrecision: 2,
            labelPrefix: "$",
            autoRange: EAutoRange.Always
        })
    );

    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, {
            id: Y_AXIS_VOLUME_ID,
            growBy: new NumberRange(0, 4),
            isVisible: false,
            autoRange: EAutoRange.Always
        })
    );

    const endDate = new Date(Date.now());
    const startDate = new Date();
    startDate.setHours(endDate.getHours() - 300);
    const priceBars = await simpleBinanceRestClient.getCandles(coinId, "1h", startDate, endDate);

    const xValues: number[] = [];
    const openValues: number[] = [];
    const highValues: number[] = [];
    const lowValues: number[] = [];
    const closeValues: number[] = [];
    const volumeValues: number[] = [];
    priceBars.forEach((priceBar: any) => {
        xValues.push(priceBar.date);
        openValues.push(priceBar.open);
        highValues.push(priceBar.high);
        lowValues.push(priceBar.low);
        closeValues.push(priceBar.close);
        volumeValues.push(priceBar.volume);
    });

    const startViewportRange = new Date();
    startViewportRange.setHours(startDate.getHours() - 100);
    xAxis.visibleRange = new NumberRange(startViewportRange.getTime() / 1000, endDate.getTime() / 1000);

    const axisProps = new XyDataSeries(wasmContext, { xValues, yValues: closeValues });

    const dataSeriesName = coinId.toString();
    const candleDataSeries = new OhlcDataSeries(wasmContext, {
        xValues,
        openValues,
        highValues,
        lowValues,
        closeValues,
        dataSeriesName
    });

    updateChartWithData(priceBars);

    const candlestickSeries = new FastCandlestickRenderableSeries(wasmContext, {
        dataSeries: candleDataSeries,
        stroke: appTheme.ForegroundColor,
        strokeThickness: 1,
        brushUp: appTheme.VividGreen + "77",
        brushDown: appTheme.MutedRed + "77",
        strokeUp: appTheme.VividGreen,
        strokeDown: appTheme.MutedRed
    });
    sciChartSurface.renderableSeries.add(candlestickSeries);

    const ohlcSeries = new FastOhlcRenderableSeries(wasmContext, {
        dataSeries: candleDataSeries,
        stroke: appTheme.ForegroundColor,
        strokeThickness: 1,
        dataPointWidth: 0.9,
        strokeUp: appTheme.VividGreen,
        strokeDown: appTheme.MutedRed,
        isVisible: false
    });
    sciChartSurface.renderableSeries.add(ohlcSeries);

    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            dataSeries: new XyMovingAverageFilter(candleDataSeries, {
                dataSeriesName: "Moving Average (20)",
                length: 20
            }),
            stroke: appTheme.VividSkyBlue
        })
    );

    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            dataSeries: new XyMovingAverageFilter(candleDataSeries, {
                dataSeriesName: "Moving Average (50)",
                length: 50
            }),
            stroke: appTheme.VividPink
        })
    );

    sciChartSurface.renderableSeries.add(
        new FastColumnRenderableSeries(wasmContext, {
            dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: volumeValues, dataSeriesName: "Volume" }),
            strokeThickness: 0,
            yAxisId: Y_AXIS_VOLUME_ID,
            paletteProvider: new VolumePaletteProvider(
                candleDataSeries,
                appTheme.VividGreen + "77",
                appTheme.MutedRed + "77"
            )
        })
    );

    sciChartSurface.chartModifiers.add(
        new ZoomExtentsModifier(),
        new ZoomPanModifier(),
        new MouseWheelZoomModifier(),
        new CursorModifier({
            crosshairStroke: appTheme.VividOrange,
            axisLabelFill: appTheme.VividOrange,
            tooltipLegendTemplate: getTooltipLegendTemplate
        })
    );

    return {
        sciChartSurface, candlestickSeries, ohlcSeries, updateChartWithData
    };
};
