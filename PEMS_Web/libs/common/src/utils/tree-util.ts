// export class BravoTreeUtil {
//     static flatten<T>(nodes: T[], childrenProp: string, arr: T[] = []) {
//         for (let index = 0; index < nodes.length; index++) {
//             arr.push(nodes[index]);
//             if (nodes[index][childrenProp] && nodes[index][childrenProp].length > 0)
//                 this.flatten(nodes[index][childrenProp], childrenProp, arr);
//         }
//         return arr;
//     }
//
//     static addNodePathForFlatList<T>(
//         flatNodes: T[],
//         idProp: string,
//         parentProp: string,
//         nameProp: string,
//         pathProp: string
//     ) {
//         flatNodes.forEach(node => {
//             let pathArr: string[] = [];
//             if (node[parentProp]) {
//                 pathArr = this.buildPath(flatNodes, node, [], idProp, parentProp, nameProp);
//             }
//
//             pathArr.push(node[nameProp]);
//             node[pathProp] = pathArr.join(' > ');
//         });
//     }
//
//     private static buildPath<T>(
//         flatNodes: T[],
//         node: T,
//         arr: string[],
//         idProp: string,
//         parentProp: string,
//         nameProp: string
//     ) {
//         const currentNode = flatNodes.find(item => item[idProp] === node[parentProp]);
//         if (currentNode) {
//             arr.unshift(currentNode[nameProp]);
//             this.buildPath(flatNodes, currentNode, arr, idProp, parentProp, nameProp);
//         }
//
//         return arr;
//     }
// }
