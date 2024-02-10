function Bullet(x,y,d) {
    this.w = 10,
    this.h = 10,
    this.x = utilities.relativeSquareCenter(x, player.w, this.w),
    this.y = utilities.relativeSquareCenter(y, player.h, this.h),
    this.s = 6,
    this.d = d
}