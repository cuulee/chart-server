const VegaLite = require('./VegaLite');

const defaults = {
  data: undefined,
  filter: undefined,
  district: undefined,
  aggregate: undefined,
  value: undefined,
  valueTitle: undefined,
  facet: undefined,
  facetTitle: undefined
};

module.exports = ({spec}) => {
  const cfg = Object.assign({}, defaults, spec);

  return VegaLite({
    spec: {
      config: {axis: {characterWidth: 0}},
      data: {
        url: cfg.data
      },
      transform: {
        filter: cfg.filter,
        calculate: [
          cfg.facet && {field: 'facet', 'expr': cfg.facet},
          cfg.district && {field: 'district', 'expr': cfg.district},
          cfg.value && {field: 'value', 'expr': cfg.value}
        ].filter(Boolean)
      },
      mark: 'bar',
      encoding: {
        column: cfg.facet && {title: cfg.facetTitle || cfg.facet, field: 'facet', type: 'nominal'},
        x: {
          title: 'District', field: 'district', type: 'ordinal',
          axis: {axisWidth: 0, tickSize: 0, labelAngle: 0}
        },
        y: {
          title: cfg.valueTitle, aggregate: cfg.aggregate,
          field: cfg.aggregate === 'count' ? '*' : 'value', type: 'quantitative'
        }
      }
    }
  });
};
