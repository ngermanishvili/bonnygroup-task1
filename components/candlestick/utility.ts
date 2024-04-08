import { CursorTooltipSvgAnnotation, EDataSeriesType, EFillPaletteMode, IFillPaletteProvider, IPointMetadata, IRenderableSeries, OhlcDataSeries, OhlcSeriesInfo, parseColorToUIntArgb, SeriesInfo } from "scichart";

export const getTooltipLegendTemplate = (seriesInfos: SeriesInfo[], svgAnnotation: CursorTooltipSvgAnnotation) => {
    let outputSvgString = "";
    seriesInfos.forEach((seriesInfo, index) => {
        const y = 20 + index * 20;
        const textColor = seriesInfo.stroke;
        let legendText = seriesInfo.formattedYValue;
        if (seriesInfo.dataSeriesType === EDataSeriesType.Ohlc) {
            const o = seriesInfo as OhlcSeriesInfo;
            legendText = `Open=${o.formattedOpenValue} High=${o.formattedHighValue} Low=${o.formattedLowValue} Close=${o.formattedCloseValue}`;
        }
        outputSvgString += `<text x="8" y="${y}" font-size="13" font-family="Verdana" fill="${textColor}">
                ${seriesInfo.seriesName}: ${legendText}
            </text>`;
    });

    return `<svg width="100%" height="100%">
                    ${outputSvgString}
                </svg>`;
};

export class VolumePaletteProvider implements IFillPaletteProvider {
    fillPaletteMode: EFillPaletteMode = EFillPaletteMode.SOLID;
    private ohlcDataSeries: OhlcDataSeries;
    private upColorArgb: number;
    private downColorArgb: number;

    constructor(masterData: OhlcDataSeries, upColor: string, downColor: string) {
        this.upColorArgb = parseColorToUIntArgb(upColor);
        this.downColorArgb = parseColorToUIntArgb(downColor);
        this.ohlcDataSeries = masterData;
    }
    onAttached(parentSeries: IRenderableSeries): void { }
    onDetached(): void { }

    overrideFillArgb(
        xValue: number,
        yValue: number,
        index: number,
        opacity?: number,
        metadata?: IPointMetadata
    ): number {
        const isUpCandle =
            this.ohlcDataSeries.getNativeOpenValues().get(index) >=
            this.ohlcDataSeries.getNativeCloseValues().get(index);
        return isUpCandle ? this.upColorArgb : this.downColorArgb;
    }

    overrideStrokeArgb(
        xValue: number,
        yValue: number,
        index: number,
        opacity?: number,
        metadata?: IPointMetadata
    ): number {
        return this.overrideFillArgb(xValue, yValue, index, opacity, metadata);
    }
}
