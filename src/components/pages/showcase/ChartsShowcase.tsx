import { Typography } from "../../ui/Typography";
import { Grid } from "../../layout/Grid";
import { UsageDonut } from "../../blocks/UsageDonutBlock";
import { ChartBlock } from "../../blocks/ChartBlock";
import { InteractiveAreaChart } from "../../blocks/InteractiveAreaChartBlock";
import { ChartCollectionBlock } from "../../blocks/ChartCollectionBlock";

function ChartsShowcase() {
  return (
    <section className="space-y-16">
      <Typography variant="h2" className="mb-8 border-b border-border pb-2">Data Visualization & Charts</Typography>
      <Grid cols={1} gap="xl">
        <div className="space-y-4">
          <Typography variant="h3">Usage Donut</Typography>
          <UsageDonut />
        </div>
        <div className="space-y-4">
          <Typography variant="h3">Single Chart</Typography>
          <ChartBlock />
        </div>
        <div className="space-y-4">
          <Typography variant="h3">Interactive Area Chart</Typography>
          <InteractiveAreaChart />
        </div>
        <div className="space-y-4">
          <Typography variant="h3">Charts Collection</Typography>
          <ChartCollectionBlock />
        </div>
      </Grid>
    </section>
  );
}

export { ChartsShowcase };
