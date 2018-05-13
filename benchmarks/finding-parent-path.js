/**
 * What is the most efficient way to walk through a given path
 * 
 * Working with the path as an array, and to .join('.') when needed is
 * faster than working on the path as a string. Having to call
 * .split('.') has a significant impact on the efficiency.
 */

const Benchmark = require('./');

Benchmark.setup(() => {
  let lorem = "Lorem.ipsum.dolor.sit.amet,.consectetur.adipiscing.elit.Sed.commodo.lorem.purus,.at.ullamcorper.risus.ornare.in.Maecenas.finibus.efficitur.odio.Praesent.in.massa.in.orci.malesuada.scelerisque.Mauris.tristique.mollis.ex.eget.molestie.Duis.eget.venenatis.ex.Nulla.semper,.nibh.eget.tempus.molestie,.orci.justo.aliquam.nulla,.vel.facilisis.justo.magna.quis.est.Cras.turpis.tellus,.tempus.nec.pharetra.nec,.faucibus.sed.mi.In.sit.amet.porta.tellus,.ac.ullamcorper.eros.Mauris.facilisis.rutrum.semper.Aenean.quis.pharetra.tellus.Sed.imperdiet.orci.et.felis.elementum,.nec.porttitor.nisi.rhoncus.Phasellus.vitae.turpis.volutpat,.dapibus.nisl.a,.cursus.dui.Mauris.id.efficitur.elit.Proin.quis.porta.felis.Ut.faucibus.metus.quis.gravida.convallis.Etiam.sed.diam.laoreet,.tincidunt.libero.non,.imperdiet.nisi.Etiam.dignissim.iaculis.quam.vitae.tristique.Nulla.consequat,.diam.at.sodales.varius,.lectus.nunc.fringilla.massa,.eget.suscipit.ex.nisi.consectetur.sapien.Sed.in.nisl.tincidunt,.convallis.arcu.ut,.laoreet.justo.Vestibulum.facilisis.interdum.leo.non.lobortis.Proin.fermentum.auctor.sapien,.id.imperdiet.quam.malesuada.vel.Vivamus.rutrum.dolor.quis.neque.mattis.molestie.Morbi.eget.efficitur.velit.Vestibulum.sed.varius.libero.Fusce";
  let arr = lorem.split('.');
});

Benchmark.add('match replace', () => {
  while (true) {
    const last = lorem.match(/\.([^.]*?)$/g) || [];
    if (last.length === 0) { break; }
    const current = (last[0] || '').replace('.', '');
    const path = lorem;
    lorem = lorem.replace(/\.([^.]*?)$/g, "")
  }
})

Benchmark.add('lastIndexOf slice', () => {
  while (true) {
    const lastIndex = lorem.lastIndexOf('.');
    if (lastIndex === -1) { break; }
    const current = lorem.slice(lastIndex + 1)
    const path = lorem;
    lorem = lorem.slice(0, lastIndex)
  }
})

Benchmark.add('lastIndexOf substr', () => {
  while (true) {
    const lastIndex = lorem.lastIndexOf('.');
    if (lastIndex === -1) { break; }
    const current = lorem.substr(lastIndex + 1)
    const path = lorem;
    lorem = lorem.substr(0, lastIndex)
  }
})

Benchmark.add('pop join', () => {
  while (arr.length > 0) {
    const current = arr[arr.length - 1];
    const path = arr.join('.');
    arr.pop();
  }
})

Benchmark.add('pop', () => {
  while (arr.length > 0) {
    const current = arr[arr.length - 1];
    arr.pop();
  }
})

Benchmark.add('split pop join', () => {
  lorem.split('.');
  while (arr.length > 0) {
    const current = arr[arr.length - 1];
    const path = arr.join('.');
    arr.pop();
  }
})

Benchmark.run();

