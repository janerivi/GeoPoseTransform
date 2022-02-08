const E_POLE_RADIUS:number = 6356752.314; // EARTH POLE RADIUS IN METERS (WGS84 ellipsoid) 
const E_EQUATOR_RADIUS:number    = 6378137.0; // EARTH EQUATOR RADIUS IN METERS (WGS84 ellipsoid)
const PI = Math.PI;
const DEG_TO_RAD = PI/180;
const RAD_TO_DEG = 180/PI;


// GeoCentric latitude from GeoDetic latitude (GPS lat)
function GCLatFromGDLat(gDLat:number, pRadius:number, eRadius:number):number{

    return RAD_TO_DEG*Math.atan((pRadius/eRadius)*Math.tan(DEG_TO_RAD*gDLat));
}

function earthCentricLatFromGeodeticLat(gDLat:number){
    return GCLatFromGDLat(gDLat, E_POLE_RADIUS, E_EQUATOR_RADIUS);
}

// based on: https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles

/*"struct Quaternion
{
    double w, x, y, z;
};

Quaternion ToQuaternion(double yaw, double pitch, double roll) // yaw (Z), pitch (Y), roll (X)
{
    // Abbreviations for the various angular functions
    double cy = cos(yaw * 0.5);
    double sy = sin(yaw * 0.5);
    double cp = cos(pitch * 0.5);
    double sp = sin(pitch * 0.5);
    double cr = cos(roll * 0.5);
    double sr = sin(roll * 0.5);

    Quaternion q;
    q.w = cr * cp * cy + sr * sp * sy;
    q.x = sr * cp * cy - cr * sp * sy;
    q.y = cr * sp * cy + sr * cp * sy;
    q.z = cr * cp * sy - sr * sp * cy;

    return q;
}


struct EulerAngles {
    double roll, pitch, yaw;
};

EulerAngles ToEulerAngles(Quaternion q) {
    EulerAngles angles;

    // roll (x-axis rotation)
    double sinr_cosp = 2 * (q.w * q.x + q.y * q.z);
    double cosr_cosp = 1 - 2 * (q.x * q.x + q.y * q.y);
    angles.roll = std::atan2(sinr_cosp, cosr_cosp);

    // pitch (y-axis rotation)
    double sinp = 2 * (q.w * q.y - q.z * q.x);
    if (std::abs(sinp) >= 1)
        angles.pitch = std::copysign(M_PI / 2, sinp); // use 90 degrees if out of range
    else
        angles.pitch = std::asin(sinp);

    // yaw (z-axis rotation)
    double siny_cosp = 2 * (q.w * q.z + q.x * q.y);
    double cosy_cosp = 1 - 2 * (q.y * q.y + q.z * q.z);
    angles.yaw = std::atan2(siny_cosp, cosy_cosp);

    return angles;
}


*/





export {GCLatFromGDLat, earthCentricLatFromGeodeticLat, RAD_TO_DEG, DEG_TO_RAD, PI, E_EQUATOR_RADIUS, E_POLE_RADIUS}