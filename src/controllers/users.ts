import {Request, Response} from 'express';
import {connection} from '../config/database';
import multer from 'multer';
import path from 'path';
import validSchema from './Validate_schema';

//((((((((((((((((((((((((((((((((((Post data into project table))))))))))))))))))))))))))))))))))

const createProject = async (req: Request, res: Response) => {
    // console.log('data', connection.query("SELECT * FROM projects"));
    const { error } = validSchema.createProjectSchema.validate(req.body);
    
        if (error) {
            return res.status(400).json({
            code: 400,
            status: false,
            message: error.details[0].message,
            });
        }
        if (error) throw error;
        console.log("Connected!");
        
        var sql = "INSERT INTO projects (projectTitle) VALUES ('Demo_project')";

        connection.query(sql, function (err) {
            if (err) return res.status(400).json({
                code: 400,
                status: false,
                message: err
            });
            else{
                return res.status(200).json({
                    code: 200,
                    status: true,
                    message: "Project created successfully"
                })
            }
        })
}


//(((((((((((((((((((((((((((((((((((((((((((((POST Upload File Functions)))))))))))))))))))))))))))))))))))))))))))))

const storageConfig = multer.diskStorage({
    // destinations is uploads folder 
    // under the project directory
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, res) => {
        // file name is prepended with current time
        // in milliseconds to handle duplicate file names
        res(null, Date.now() + "-" + file.originalname);
    },
});

// file filter for filtering only images
const fileFilterConfig = function(req: any, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => void) {
    if (file.mimetype === "image/jpeg"
        || file.mimetype === "image/png") {
        // calling callback with true
        // as mimetype of file is image
        cb(null, true);
    } else {
        // false to indicate not to store the file
        cb(null, false);
    }
};

// creating multer object for storing
// with configuration
export const upload = multer({
    // applying storage and file filter
    storage: storageConfig,
    limits: {
        // limits file size to 5 MB
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilterConfig,
});

const createScan = async (req: Request, res: Response, next: any) => {
    upload.single('scanImage')(req, res, (err) => {
        if (err) {
            return res.status(400).send({ error: 'File upload failed!' });
        }
        
        const { error } = validSchema.createScanSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
            code: 400,
            status: false,
            message: error.details[0].message,
            });
        }
        
        var sql = `INSERT INTO scans (scanTitle, scanDoc) VALUES ('${req.body.scanTitle}', '${req.file?.path}')`;

        connection.query(sql, function (err) {
            if (err) return res.status(400).json({
                status: false,
                message: err
            });
            else{
                return res.status(200).json({
                    code: 200,
                    status: true,
                    message: "Scan created successfully"
                })
            }
        })
    });
    
    

}



//(((((((((((((((((((((((((((((((((((Get full list of projects)))))))))))))))))))))))))))))))))))

const getProjectList = (req: Request, res: Response) => {

    var sql = "Select * from projects where isActive = 1";
    connection.query(sql, function (err, result) {
        // console.log(result);
        

        if(err) {
            res.status(400).json({
                code: 400,
                status: false,
                message: "errorrrrrrr"
            })
        } else {
            res.status(200).json({
                code: 200,
                status: true,
                message: "Project List successfully retrieved", 
                data : result
                }
            )
        }
    })
}

//(((((((((((((((((((((((((((((((((((((((Get full lit of scan))))))))))))))))))))))))))))))))))))

const getScanList = (req:Request, res: Response) =>{
    
    connection.query("select * from scans", function (err, result){
        if(err) {
            res.status(400).json({
                code: 400,
                status: false,
                message: "errorrrrrrr"
            })
        } else {
            res.status(200).json({
                code: 200,
                status: true,
                message: "Scans List successfully retrieved", 
                data : result
                }
            )
        }
    })
}

export default {
    createProject,
    getProjectList,
    createScan,
    getScanList
}