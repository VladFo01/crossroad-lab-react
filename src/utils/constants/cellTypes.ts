// types of cells
export const notACover = { canDrive: false, canWalk: false };
export const roadCover = { canDrive: true, canWalk: false };
export const sidewalkCover = { canDrive: false, canWalk: true };
export const crosswalkCover = { canDrive: true, canWalk: true };
export const crossroadCover = { canDrive: true, canWalk: false, crossroad: true };
