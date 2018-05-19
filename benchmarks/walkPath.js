const Benchmark = require('./');
Benchmark.walkPath = require('../dist/cjs/path/walkPath').default;

Benchmark.setup(() => {
  let lorem = 'Lorem.ipsum.dolor.sit.amet,.consectetur.adipiscing.elit.Sed.commodo.lorem.purus,.at.ullamcorper.risus.ornare.in.Maecenas.finibus.efficitur.odio.Praesent.in.massa.in.orci.malesuada.scelerisque.Mauris.tristique.mollis.ex.eget.molestie.Duis.eget.venenatis.ex.Nulla.semper,.nibh.eget.tempus.molestie,.orci.justo.aliquam.nulla,.vel.facilisis.justo.magna.quis.est.Cras.turpis.tellus,.tempus.nec.pharetra.nec,.faucibus.sed.mi.In.sit.amet.porta.tellus,.ac.ullamcorper.eros.Mauris.facilisis.rutrum.semper.Aenean.quis.pharetra.tellus.Sed.imperdiet.orci.et.felis.elementum,.nec.porttitor.nisi.rhoncus.Phasellus.vitae.turpis.volutpat,.dapibus.nisl.a,.cursus.dui.Mauris.id.efficitur.elit.Proin.quis.porta.felis.Ut.faucibus.metus.quis.gravida.convallis.Etiam.sed.diam.laoreet,.tincidunt.libero.non,.imperdiet.nisi.Etiam.dignissim.iaculis.quam.vitae.tristique.Nulla.consequat,.diam.at.sodales.varius,.lectus.nunc.fringilla.massa,.eget.suscipit.ex.nisi.consectetur.sapien.Sed.in.nisl.tincidunt,.convallis.arcu.ut,.laoreet.justo.Vestibulum.facilisis.interdum.leo.non.lobortis.Proin.fermentum.auctor.sapien,.id.imperdiet.quam.malesuada.vel.Vivamus.rutrum.dolor.quis.neque.mattis.molestie.Morbi.eget.efficitur.velit.Vestibulum.sed.varius.libero.Fusce';
  let arr = lorem.split('.');
  return { lorem, arr };
})

Benchmark.add('string input', ({ walkPath, lorem }) => {
  walkPath(lorem, () => true, {})
})

Benchmark.add('string input - fromRoot', ({ walkPath, lorem }) => {
  walkPath(lorem, () => true, { fromRoot: true })
})

Benchmark.add('string input - fullPath', ({ walkPath, lorem }) => {
  walkPath(lorem, () => true, { fullPath: true })
})

Benchmark.add('array input', ({ walkPath, arr }) => {
  walkPath(arr, () => true, {})
})

Benchmark.add('array input - fromRoot', ({ walkPath, arr }) => {
  walkPath(arr, () => true, { fromRoot: true })
})

Benchmark.add('array input - fullPath', ({ walkPath, arr }) => {
  walkPath(arr, () => true, { fullPath: true })
})

Benchmark.run();
