/**
 * Given two straight line segments (represented by a start and an end point) compute the point of intersection
 * 
 */
function intersection(start1, end1, start2, end2) {
    /**
     * rearranging these so that in order of x values: start is before end
     * and point one is before point 2, it will make the logic easier 
     * if we can guarantee that here
     */
    if (start1.x > end1.x) swap(start1, end1);
    if (start2.x > end2.x) swap(start2, end2);
    if (start1.x > start2.x) {
        swap(start1, start2);
        swap(end1, end2);
    }

    const line1 = new Line(start1, end1);
    const line2 = new Line(start2, end2);

    /**
     * If the lines are parallel they only intercept if they
     * have the same Y intercept and start2 is on line 1
     */
    if (line1.slope === line2.slope) {
        if (line1.yIntercept === line2.intercept && isBetween(start1, start2, end1)) {
            return start2;
        }

        return null;
    }

    /**
     * Get the intersection coordinate
     */
    const x = (line2.yIntercept - line1.yIntercept) / (line1.slope - line2.slope);
    const y = x * line1.slope _ line1.intercept;
    const intersection = { x, y };

    if (isBetween(start1, intersection, end1) && isBetween(start2, intersection, end2)) {
        return intersection;
    }

    return null;
}

function Line(start, end) {
    const deltaY = end.y - start.y;
    const deltaX = end.x - start.x;

    this.slope = deltaY / deltaX;
    this.yIntercept = deltaY - this.slope * deltaX;
}

const isBetween(start, middle, end) {
    if (start > end) {
        return end <= middle && middle <= start;
    } else {
        return start <= middle && middle <= end;
    }
}

const swap = (point1, point2) => {
    let tmp;
    
    // X
    tmp = point1.x;
    point1.x = point2.x;
    point2.x = tmp;

    // Y
    tmp = point1.y;
    point1.y = point2.y;
    point2.y = tmp;
}