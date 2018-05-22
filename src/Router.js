//类文件引入
import Clothes from './Module/Clothes';
import Data from './Module/Data/App';
// import Takeclothes from './Module/Takeclothes';
import RevokeData from './Module/RevokeData/RevokeData';
import OperatingDetails from './Module/OperatingDetails/OperatingDetails.js';
//路由对象
export default {
    clothes:Clothes,    //收衣界面
    data:Data,
    // take_clothes:Takeclothes,   //取衣界面
    revoke_data:RevokeData,
    operating_details:OperatingDetails,
    
};
