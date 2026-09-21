import { buildSleepingCat } from './gallery-refined-cat.js';
import { buildCatTree } from './gallery-refined-cat-tree.js';

export function buildHomeFurniture(T, scene) {
  const root = new T.Group(); root.name = 'Xiaoman and her favourite furniture'; scene.add(root);
  const sleeping = buildSleepingCat(T, root);
  const climbing = buildCatTree(T, root);
  const cat = sleeping.cat, tree = climbing.tree;
  cat.position.set(2.25, .012, 2.6); cat.rotation.y = -.12;
  tree.position.set(2.85, .015, -2.05); tree.rotation.y = -.10;
  const toy = new T.Group(); toy.name = 'a tiny rose yarn ball'; toy.position.set(1.25,.088,3.38); root.add(toy);
  const toyMaterial = new T.MeshStandardMaterial({color:'#cca1a1',roughness:.98});
  const threadMaterial = new T.MeshStandardMaterial({color:'#edc4be',roughness:1});
  const toyGeometry = new T.SphereGeometry(.086,24,16);
  const yarn = new T.Mesh(toyGeometry,toyMaterial); yarn.castShadow=true; yarn.receiveShadow=true; toy.add(yarn);
  const threadGeometry = new T.TorusGeometry(.087,.0025,5,42);
  for(let i=0;i<8;i++){const ring=new T.Mesh(threadGeometry,threadMaterial);ring.rotation.set(i*.7,i*.43,i*.23);toy.add(ring);}
  const looseGeometry = new T.TubeGeometry(new T.CatmullRomCurve3([
    new T.Vector3(.03,-.06,.05),new T.Vector3(.13,-.075,.10),new T.Vector3(.23,-.075,.06),new T.Vector3(.32,-.075,.14)
  ]),24,.003,5,false);
  toy.add(new T.Mesh(looseGeometry,threadMaterial));
  root.updateMatrixWorld(true);
  const catFocus = sleeping.focus.clone().applyMatrix4(cat.matrixWorld);
  const treeFocus = climbing.focus.clone().applyMatrix4(tree.matrixWorld);
  return {root,cat,tree,catFocus,treeFocus,toy,
    dispose(){sleeping.dispose();climbing.dispose();root.removeFromParent();
      toyGeometry.dispose();threadGeometry.dispose();looseGeometry.dispose();toyMaterial.dispose();threadMaterial.dispose();}
  };
}
