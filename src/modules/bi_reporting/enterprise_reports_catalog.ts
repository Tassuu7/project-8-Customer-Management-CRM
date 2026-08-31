/**
 * Standard Built-In BI Reports Catalog
 */

export interface StandardReportDefinition {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  queryAggregation: string;
  chartType: 'bar' | 'line' | 'donut' | 'table';
  refreshIntervalSeconds: number;
}

export const STANDARD_REPORTS_CATALOG: StandardReportDefinition[] = [
  {
    id: 'rep-1',
    code: 'RPT-101',
    title: 'Sales Velocity Standard Report #1 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-2',
    code: 'RPT-102',
    title: 'Customer Success Standard Report #2 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-3',
    code: 'RPT-103',
    title: 'Service Desk Standard Report #3 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-4',
    code: 'RPT-104',
    title: 'Financial ARR Standard Report #4 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-5',
    code: 'RPT-105',
    title: 'Compliance Standard Report #5 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-6',
    code: 'RPT-106',
    title: 'Executive Standard Report #6 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-7',
    code: 'RPT-107',
    title: 'Sales Velocity Standard Report #7 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-8',
    code: 'RPT-108',
    title: 'Customer Success Standard Report #8 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-9',
    code: 'RPT-109',
    title: 'Service Desk Standard Report #9 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-10',
    code: 'RPT-110',
    title: 'Financial ARR Standard Report #10 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-11',
    code: 'RPT-111',
    title: 'Compliance Standard Report #11 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-12',
    code: 'RPT-112',
    title: 'Executive Standard Report #12 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-13',
    code: 'RPT-113',
    title: 'Sales Velocity Standard Report #13 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-14',
    code: 'RPT-114',
    title: 'Customer Success Standard Report #14 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-15',
    code: 'RPT-115',
    title: 'Service Desk Standard Report #15 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-16',
    code: 'RPT-116',
    title: 'Financial ARR Standard Report #16 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-17',
    code: 'RPT-117',
    title: 'Compliance Standard Report #17 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-18',
    code: 'RPT-118',
    title: 'Executive Standard Report #18 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-19',
    code: 'RPT-119',
    title: 'Sales Velocity Standard Report #19 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-20',
    code: 'RPT-120',
    title: 'Customer Success Standard Report #20 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-21',
    code: 'RPT-121',
    title: 'Service Desk Standard Report #21 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-22',
    code: 'RPT-122',
    title: 'Financial ARR Standard Report #22 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-23',
    code: 'RPT-123',
    title: 'Compliance Standard Report #23 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-24',
    code: 'RPT-124',
    title: 'Executive Standard Report #24 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-25',
    code: 'RPT-125',
    title: 'Sales Velocity Standard Report #25 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-26',
    code: 'RPT-126',
    title: 'Customer Success Standard Report #26 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-27',
    code: 'RPT-127',
    title: 'Service Desk Standard Report #27 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-28',
    code: 'RPT-128',
    title: 'Financial ARR Standard Report #28 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-29',
    code: 'RPT-129',
    title: 'Compliance Standard Report #29 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-30',
    code: 'RPT-130',
    title: 'Executive Standard Report #30 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-31',
    code: 'RPT-131',
    title: 'Sales Velocity Standard Report #31 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-32',
    code: 'RPT-132',
    title: 'Customer Success Standard Report #32 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-33',
    code: 'RPT-133',
    title: 'Service Desk Standard Report #33 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-34',
    code: 'RPT-134',
    title: 'Financial ARR Standard Report #34 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-35',
    code: 'RPT-135',
    title: 'Compliance Standard Report #35 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-36',
    code: 'RPT-136',
    title: 'Executive Standard Report #36 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-37',
    code: 'RPT-137',
    title: 'Sales Velocity Standard Report #37 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-38',
    code: 'RPT-138',
    title: 'Customer Success Standard Report #38 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-39',
    code: 'RPT-139',
    title: 'Service Desk Standard Report #39 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-40',
    code: 'RPT-140',
    title: 'Financial ARR Standard Report #40 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-41',
    code: 'RPT-141',
    title: 'Compliance Standard Report #41 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-42',
    code: 'RPT-142',
    title: 'Executive Standard Report #42 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-43',
    code: 'RPT-143',
    title: 'Sales Velocity Standard Report #43 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-44',
    code: 'RPT-144',
    title: 'Customer Success Standard Report #44 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-45',
    code: 'RPT-145',
    title: 'Service Desk Standard Report #45 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-46',
    code: 'RPT-146',
    title: 'Financial ARR Standard Report #46 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-47',
    code: 'RPT-147',
    title: 'Compliance Standard Report #47 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-48',
    code: 'RPT-148',
    title: 'Executive Standard Report #48 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-49',
    code: 'RPT-149',
    title: 'Sales Velocity Standard Report #49 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-50',
    code: 'RPT-150',
    title: 'Customer Success Standard Report #50 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-51',
    code: 'RPT-151',
    title: 'Service Desk Standard Report #51 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-52',
    code: 'RPT-152',
    title: 'Financial ARR Standard Report #52 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-53',
    code: 'RPT-153',
    title: 'Compliance Standard Report #53 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-54',
    code: 'RPT-154',
    title: 'Executive Standard Report #54 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-55',
    code: 'RPT-155',
    title: 'Sales Velocity Standard Report #55 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-56',
    code: 'RPT-156',
    title: 'Customer Success Standard Report #56 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-57',
    code: 'RPT-157',
    title: 'Service Desk Standard Report #57 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-58',
    code: 'RPT-158',
    title: 'Financial ARR Standard Report #58 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-59',
    code: 'RPT-159',
    title: 'Compliance Standard Report #59 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-60',
    code: 'RPT-160',
    title: 'Executive Standard Report #60 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-61',
    code: 'RPT-161',
    title: 'Sales Velocity Standard Report #61 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-62',
    code: 'RPT-162',
    title: 'Customer Success Standard Report #62 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-63',
    code: 'RPT-163',
    title: 'Service Desk Standard Report #63 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-64',
    code: 'RPT-164',
    title: 'Financial ARR Standard Report #64 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-65',
    code: 'RPT-165',
    title: 'Compliance Standard Report #65 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-66',
    code: 'RPT-166',
    title: 'Executive Standard Report #66 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-67',
    code: 'RPT-167',
    title: 'Sales Velocity Standard Report #67 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-68',
    code: 'RPT-168',
    title: 'Customer Success Standard Report #68 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-69',
    code: 'RPT-169',
    title: 'Service Desk Standard Report #69 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-70',
    code: 'RPT-170',
    title: 'Financial ARR Standard Report #70 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-71',
    code: 'RPT-171',
    title: 'Compliance Standard Report #71 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-72',
    code: 'RPT-172',
    title: 'Executive Standard Report #72 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-73',
    code: 'RPT-173',
    title: 'Sales Velocity Standard Report #73 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-74',
    code: 'RPT-174',
    title: 'Customer Success Standard Report #74 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-75',
    code: 'RPT-175',
    title: 'Service Desk Standard Report #75 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-76',
    code: 'RPT-176',
    title: 'Financial ARR Standard Report #76 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-77',
    code: 'RPT-177',
    title: 'Compliance Standard Report #77 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-78',
    code: 'RPT-178',
    title: 'Executive Standard Report #78 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-79',
    code: 'RPT-179',
    title: 'Sales Velocity Standard Report #79 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-80',
    code: 'RPT-180',
    title: 'Customer Success Standard Report #80 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-81',
    code: 'RPT-181',
    title: 'Service Desk Standard Report #81 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-82',
    code: 'RPT-182',
    title: 'Financial ARR Standard Report #82 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-83',
    code: 'RPT-183',
    title: 'Compliance Standard Report #83 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-84',
    code: 'RPT-184',
    title: 'Executive Standard Report #84 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-85',
    code: 'RPT-185',
    title: 'Sales Velocity Standard Report #85 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-86',
    code: 'RPT-186',
    title: 'Customer Success Standard Report #86 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-87',
    code: 'RPT-187',
    title: 'Service Desk Standard Report #87 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-88',
    code: 'RPT-188',
    title: 'Financial ARR Standard Report #88 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-89',
    code: 'RPT-189',
    title: 'Compliance Standard Report #89 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-90',
    code: 'RPT-190',
    title: 'Executive Standard Report #90 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-91',
    code: 'RPT-191',
    title: 'Sales Velocity Standard Report #91 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-92',
    code: 'RPT-192',
    title: 'Customer Success Standard Report #92 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-93',
    code: 'RPT-193',
    title: 'Service Desk Standard Report #93 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-94',
    code: 'RPT-194',
    title: 'Financial ARR Standard Report #94 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-95',
    code: 'RPT-195',
    title: 'Compliance Standard Report #95 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-96',
    code: 'RPT-196',
    title: 'Executive Standard Report #96 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-97',
    code: 'RPT-197',
    title: 'Sales Velocity Standard Report #97 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-98',
    code: 'RPT-198',
    title: 'Customer Success Standard Report #98 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-99',
    code: 'RPT-199',
    title: 'Service Desk Standard Report #99 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-100',
    code: 'RPT-200',
    title: 'Financial ARR Standard Report #100 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-101',
    code: 'RPT-201',
    title: 'Compliance Standard Report #101 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-102',
    code: 'RPT-202',
    title: 'Executive Standard Report #102 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-103',
    code: 'RPT-203',
    title: 'Sales Velocity Standard Report #103 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-104',
    code: 'RPT-204',
    title: 'Customer Success Standard Report #104 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-105',
    code: 'RPT-205',
    title: 'Service Desk Standard Report #105 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-106',
    code: 'RPT-206',
    title: 'Financial ARR Standard Report #106 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-107',
    code: 'RPT-207',
    title: 'Compliance Standard Report #107 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-108',
    code: 'RPT-208',
    title: 'Executive Standard Report #108 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-109',
    code: 'RPT-209',
    title: 'Sales Velocity Standard Report #109 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-110',
    code: 'RPT-210',
    title: 'Customer Success Standard Report #110 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-111',
    code: 'RPT-211',
    title: 'Service Desk Standard Report #111 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-112',
    code: 'RPT-212',
    title: 'Financial ARR Standard Report #112 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-113',
    code: 'RPT-213',
    title: 'Compliance Standard Report #113 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-114',
    code: 'RPT-214',
    title: 'Executive Standard Report #114 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-115',
    code: 'RPT-215',
    title: 'Sales Velocity Standard Report #115 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-116',
    code: 'RPT-216',
    title: 'Customer Success Standard Report #116 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-117',
    code: 'RPT-217',
    title: 'Service Desk Standard Report #117 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-118',
    code: 'RPT-218',
    title: 'Financial ARR Standard Report #118 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-119',
    code: 'RPT-219',
    title: 'Compliance Standard Report #119 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-120',
    code: 'RPT-220',
    title: 'Executive Standard Report #120 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-121',
    code: 'RPT-221',
    title: 'Sales Velocity Standard Report #121 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-122',
    code: 'RPT-222',
    title: 'Customer Success Standard Report #122 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-123',
    code: 'RPT-223',
    title: 'Service Desk Standard Report #123 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-124',
    code: 'RPT-224',
    title: 'Financial ARR Standard Report #124 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-125',
    code: 'RPT-225',
    title: 'Compliance Standard Report #125 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-126',
    code: 'RPT-226',
    title: 'Executive Standard Report #126 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-127',
    code: 'RPT-227',
    title: 'Sales Velocity Standard Report #127 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-128',
    code: 'RPT-228',
    title: 'Customer Success Standard Report #128 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-129',
    code: 'RPT-229',
    title: 'Service Desk Standard Report #129 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-130',
    code: 'RPT-230',
    title: 'Financial ARR Standard Report #130 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-131',
    code: 'RPT-231',
    title: 'Compliance Standard Report #131 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-132',
    code: 'RPT-232',
    title: 'Executive Standard Report #132 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-133',
    code: 'RPT-233',
    title: 'Sales Velocity Standard Report #133 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-134',
    code: 'RPT-234',
    title: 'Customer Success Standard Report #134 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-135',
    code: 'RPT-235',
    title: 'Service Desk Standard Report #135 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-136',
    code: 'RPT-236',
    title: 'Financial ARR Standard Report #136 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-137',
    code: 'RPT-237',
    title: 'Compliance Standard Report #137 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-138',
    code: 'RPT-238',
    title: 'Executive Standard Report #138 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-139',
    code: 'RPT-239',
    title: 'Sales Velocity Standard Report #139 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-140',
    code: 'RPT-240',
    title: 'Customer Success Standard Report #140 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-141',
    code: 'RPT-241',
    title: 'Service Desk Standard Report #141 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-142',
    code: 'RPT-242',
    title: 'Financial ARR Standard Report #142 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-143',
    code: 'RPT-243',
    title: 'Compliance Standard Report #143 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-144',
    code: 'RPT-244',
    title: 'Executive Standard Report #144 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-145',
    code: 'RPT-245',
    title: 'Sales Velocity Standard Report #145 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-146',
    code: 'RPT-246',
    title: 'Customer Success Standard Report #146 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-147',
    code: 'RPT-247',
    title: 'Service Desk Standard Report #147 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-148',
    code: 'RPT-248',
    title: 'Financial ARR Standard Report #148 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-149',
    code: 'RPT-249',
    title: 'Compliance Standard Report #149 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-150',
    code: 'RPT-250',
    title: 'Executive Standard Report #150 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-151',
    code: 'RPT-251',
    title: 'Sales Velocity Standard Report #151 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-152',
    code: 'RPT-252',
    title: 'Customer Success Standard Report #152 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-153',
    code: 'RPT-253',
    title: 'Service Desk Standard Report #153 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-154',
    code: 'RPT-254',
    title: 'Financial ARR Standard Report #154 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-155',
    code: 'RPT-255',
    title: 'Compliance Standard Report #155 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-156',
    code: 'RPT-256',
    title: 'Executive Standard Report #156 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-157',
    code: 'RPT-257',
    title: 'Sales Velocity Standard Report #157 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-158',
    code: 'RPT-258',
    title: 'Customer Success Standard Report #158 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-159',
    code: 'RPT-259',
    title: 'Service Desk Standard Report #159 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-160',
    code: 'RPT-260',
    title: 'Financial ARR Standard Report #160 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-161',
    code: 'RPT-261',
    title: 'Compliance Standard Report #161 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-162',
    code: 'RPT-262',
    title: 'Executive Standard Report #162 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-163',
    code: 'RPT-263',
    title: 'Sales Velocity Standard Report #163 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-164',
    code: 'RPT-264',
    title: 'Customer Success Standard Report #164 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-165',
    code: 'RPT-265',
    title: 'Service Desk Standard Report #165 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-166',
    code: 'RPT-266',
    title: 'Financial ARR Standard Report #166 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-167',
    code: 'RPT-267',
    title: 'Compliance Standard Report #167 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-168',
    code: 'RPT-268',
    title: 'Executive Standard Report #168 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-169',
    code: 'RPT-269',
    title: 'Sales Velocity Standard Report #169 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-170',
    code: 'RPT-270',
    title: 'Customer Success Standard Report #170 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-171',
    code: 'RPT-271',
    title: 'Service Desk Standard Report #171 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-172',
    code: 'RPT-272',
    title: 'Financial ARR Standard Report #172 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-173',
    code: 'RPT-273',
    title: 'Compliance Standard Report #173 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-174',
    code: 'RPT-274',
    title: 'Executive Standard Report #174 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-175',
    code: 'RPT-275',
    title: 'Sales Velocity Standard Report #175 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-176',
    code: 'RPT-276',
    title: 'Customer Success Standard Report #176 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-177',
    code: 'RPT-277',
    title: 'Service Desk Standard Report #177 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-178',
    code: 'RPT-278',
    title: 'Financial ARR Standard Report #178 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-179',
    code: 'RPT-279',
    title: 'Compliance Standard Report #179 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-180',
    code: 'RPT-280',
    title: 'Executive Standard Report #180 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-181',
    code: 'RPT-281',
    title: 'Sales Velocity Standard Report #181 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-182',
    code: 'RPT-282',
    title: 'Customer Success Standard Report #182 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-183',
    code: 'RPT-283',
    title: 'Service Desk Standard Report #183 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-184',
    code: 'RPT-284',
    title: 'Financial ARR Standard Report #184 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-185',
    code: 'RPT-285',
    title: 'Compliance Standard Report #185 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-186',
    code: 'RPT-286',
    title: 'Executive Standard Report #186 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-187',
    code: 'RPT-287',
    title: 'Sales Velocity Standard Report #187 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-188',
    code: 'RPT-288',
    title: 'Customer Success Standard Report #188 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-189',
    code: 'RPT-289',
    title: 'Service Desk Standard Report #189 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-190',
    code: 'RPT-290',
    title: 'Financial ARR Standard Report #190 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-191',
    code: 'RPT-291',
    title: 'Compliance Standard Report #191 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-192',
    code: 'RPT-292',
    title: 'Executive Standard Report #192 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-193',
    code: 'RPT-293',
    title: 'Sales Velocity Standard Report #193 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-194',
    code: 'RPT-294',
    title: 'Customer Success Standard Report #194 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-195',
    code: 'RPT-295',
    title: 'Service Desk Standard Report #195 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-196',
    code: 'RPT-296',
    title: 'Financial ARR Standard Report #196 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-197',
    code: 'RPT-297',
    title: 'Compliance Standard Report #197 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-198',
    code: 'RPT-298',
    title: 'Executive Standard Report #198 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-199',
    code: 'RPT-299',
    title: 'Sales Velocity Standard Report #199 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-200',
    code: 'RPT-300',
    title: 'Customer Success Standard Report #200 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-201',
    code: 'RPT-301',
    title: 'Service Desk Standard Report #201 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-202',
    code: 'RPT-302',
    title: 'Financial ARR Standard Report #202 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-203',
    code: 'RPT-303',
    title: 'Compliance Standard Report #203 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-204',
    code: 'RPT-304',
    title: 'Executive Standard Report #204 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-205',
    code: 'RPT-305',
    title: 'Sales Velocity Standard Report #205 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-206',
    code: 'RPT-306',
    title: 'Customer Success Standard Report #206 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-207',
    code: 'RPT-307',
    title: 'Service Desk Standard Report #207 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-208',
    code: 'RPT-308',
    title: 'Financial ARR Standard Report #208 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-209',
    code: 'RPT-309',
    title: 'Compliance Standard Report #209 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-210',
    code: 'RPT-310',
    title: 'Executive Standard Report #210 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-211',
    code: 'RPT-311',
    title: 'Sales Velocity Standard Report #211 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-212',
    code: 'RPT-312',
    title: 'Customer Success Standard Report #212 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-213',
    code: 'RPT-313',
    title: 'Service Desk Standard Report #213 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-214',
    code: 'RPT-314',
    title: 'Financial ARR Standard Report #214 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-215',
    code: 'RPT-315',
    title: 'Compliance Standard Report #215 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-216',
    code: 'RPT-316',
    title: 'Executive Standard Report #216 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-217',
    code: 'RPT-317',
    title: 'Sales Velocity Standard Report #217 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-218',
    code: 'RPT-318',
    title: 'Customer Success Standard Report #218 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-219',
    code: 'RPT-319',
    title: 'Service Desk Standard Report #219 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-220',
    code: 'RPT-320',
    title: 'Financial ARR Standard Report #220 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-221',
    code: 'RPT-321',
    title: 'Compliance Standard Report #221 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-222',
    code: 'RPT-322',
    title: 'Executive Standard Report #222 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-223',
    code: 'RPT-323',
    title: 'Sales Velocity Standard Report #223 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-224',
    code: 'RPT-324',
    title: 'Customer Success Standard Report #224 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-225',
    code: 'RPT-325',
    title: 'Service Desk Standard Report #225 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-226',
    code: 'RPT-326',
    title: 'Financial ARR Standard Report #226 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-227',
    code: 'RPT-327',
    title: 'Compliance Standard Report #227 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-228',
    code: 'RPT-328',
    title: 'Executive Standard Report #228 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-229',
    code: 'RPT-329',
    title: 'Sales Velocity Standard Report #229 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-230',
    code: 'RPT-330',
    title: 'Customer Success Standard Report #230 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-231',
    code: 'RPT-331',
    title: 'Service Desk Standard Report #231 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-232',
    code: 'RPT-332',
    title: 'Financial ARR Standard Report #232 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-233',
    code: 'RPT-333',
    title: 'Compliance Standard Report #233 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-234',
    code: 'RPT-334',
    title: 'Executive Standard Report #234 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-235',
    code: 'RPT-335',
    title: 'Sales Velocity Standard Report #235 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-236',
    code: 'RPT-336',
    title: 'Customer Success Standard Report #236 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-237',
    code: 'RPT-337',
    title: 'Service Desk Standard Report #237 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-238',
    code: 'RPT-338',
    title: 'Financial ARR Standard Report #238 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-239',
    code: 'RPT-339',
    title: 'Compliance Standard Report #239 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-240',
    code: 'RPT-340',
    title: 'Executive Standard Report #240 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-241',
    code: 'RPT-341',
    title: 'Sales Velocity Standard Report #241 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-242',
    code: 'RPT-342',
    title: 'Customer Success Standard Report #242 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-243',
    code: 'RPT-343',
    title: 'Service Desk Standard Report #243 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-244',
    code: 'RPT-344',
    title: 'Financial ARR Standard Report #244 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-245',
    code: 'RPT-345',
    title: 'Compliance Standard Report #245 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-246',
    code: 'RPT-346',
    title: 'Executive Standard Report #246 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-247',
    code: 'RPT-347',
    title: 'Sales Velocity Standard Report #247 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-248',
    code: 'RPT-348',
    title: 'Customer Success Standard Report #248 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-249',
    code: 'RPT-349',
    title: 'Service Desk Standard Report #249 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-250',
    code: 'RPT-350',
    title: 'Financial ARR Standard Report #250 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-251',
    code: 'RPT-351',
    title: 'Compliance Standard Report #251 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-252',
    code: 'RPT-352',
    title: 'Executive Standard Report #252 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-253',
    code: 'RPT-353',
    title: 'Sales Velocity Standard Report #253 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-254',
    code: 'RPT-354',
    title: 'Customer Success Standard Report #254 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-255',
    code: 'RPT-355',
    title: 'Service Desk Standard Report #255 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-256',
    code: 'RPT-356',
    title: 'Financial ARR Standard Report #256 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-257',
    code: 'RPT-357',
    title: 'Compliance Standard Report #257 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-258',
    code: 'RPT-358',
    title: 'Executive Standard Report #258 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-259',
    code: 'RPT-359',
    title: 'Sales Velocity Standard Report #259 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-260',
    code: 'RPT-360',
    title: 'Customer Success Standard Report #260 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-261',
    code: 'RPT-361',
    title: 'Service Desk Standard Report #261 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-262',
    code: 'RPT-362',
    title: 'Financial ARR Standard Report #262 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-263',
    code: 'RPT-363',
    title: 'Compliance Standard Report #263 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-264',
    code: 'RPT-364',
    title: 'Executive Standard Report #264 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-265',
    code: 'RPT-365',
    title: 'Sales Velocity Standard Report #265 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-266',
    code: 'RPT-366',
    title: 'Customer Success Standard Report #266 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-267',
    code: 'RPT-367',
    title: 'Service Desk Standard Report #267 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-268',
    code: 'RPT-368',
    title: 'Financial ARR Standard Report #268 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-269',
    code: 'RPT-369',
    title: 'Compliance Standard Report #269 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-270',
    code: 'RPT-370',
    title: 'Executive Standard Report #270 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-271',
    code: 'RPT-371',
    title: 'Sales Velocity Standard Report #271 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-272',
    code: 'RPT-372',
    title: 'Customer Success Standard Report #272 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-273',
    code: 'RPT-373',
    title: 'Service Desk Standard Report #273 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-274',
    code: 'RPT-374',
    title: 'Financial ARR Standard Report #274 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-275',
    code: 'RPT-375',
    title: 'Compliance Standard Report #275 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-276',
    code: 'RPT-376',
    title: 'Executive Standard Report #276 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-277',
    code: 'RPT-377',
    title: 'Sales Velocity Standard Report #277 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-278',
    code: 'RPT-378',
    title: 'Customer Success Standard Report #278 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-279',
    code: 'RPT-379',
    title: 'Service Desk Standard Report #279 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-280',
    code: 'RPT-380',
    title: 'Financial ARR Standard Report #280 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-281',
    code: 'RPT-381',
    title: 'Compliance Standard Report #281 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-282',
    code: 'RPT-382',
    title: 'Executive Standard Report #282 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-283',
    code: 'RPT-383',
    title: 'Sales Velocity Standard Report #283 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-284',
    code: 'RPT-384',
    title: 'Customer Success Standard Report #284 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-285',
    code: 'RPT-385',
    title: 'Service Desk Standard Report #285 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-286',
    code: 'RPT-386',
    title: 'Financial ARR Standard Report #286 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-287',
    code: 'RPT-387',
    title: 'Compliance Standard Report #287 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-288',
    code: 'RPT-388',
    title: 'Executive Standard Report #288 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-289',
    code: 'RPT-389',
    title: 'Sales Velocity Standard Report #289 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-290',
    code: 'RPT-390',
    title: 'Customer Success Standard Report #290 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-291',
    code: 'RPT-391',
    title: 'Service Desk Standard Report #291 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-292',
    code: 'RPT-392',
    title: 'Financial ARR Standard Report #292 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-293',
    code: 'RPT-393',
    title: 'Compliance Standard Report #293 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-294',
    code: 'RPT-394',
    title: 'Executive Standard Report #294 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-295',
    code: 'RPT-395',
    title: 'Sales Velocity Standard Report #295 - Metric Aggregation',
    category: 'Sales Velocity',
    description: 'Calculates multi-dimensional rollup metrics for Sales Velocity stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-296',
    code: 'RPT-396',
    title: 'Customer Success Standard Report #296 - Metric Aggregation',
    category: 'Customer Success',
    description: 'Calculates multi-dimensional rollup metrics for Customer Success stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-297',
    code: 'RPT-397',
    title: 'Service Desk Standard Report #297 - Metric Aggregation',
    category: 'Service Desk',
    description: 'Calculates multi-dimensional rollup metrics for Service Desk stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-298',
    code: 'RPT-398',
    title: 'Financial ARR Standard Report #298 - Metric Aggregation',
    category: 'Financial ARR',
    description: 'Calculates multi-dimensional rollup metrics for Financial ARR stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'line',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-299',
    code: 'RPT-399',
    title: 'Compliance Standard Report #299 - Metric Aggregation',
    category: 'Compliance',
    description: 'Calculates multi-dimensional rollup metrics for Compliance stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'donut',
    refreshIntervalSeconds: 3600
  },
  {
    id: 'rep-300',
    code: 'RPT-400',
    title: 'Executive Standard Report #300 - Metric Aggregation',
    category: 'Executive',
    description: 'Calculates multi-dimensional rollup metrics for Executive stakeholders.',
    queryAggregation: 'SELECT COUNT(*), SUM(amount), AVG(healthScore) GROUP BY month',
    chartType: 'bar',
    refreshIntervalSeconds: 3600
  },
];
