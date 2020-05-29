const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a function 
exports.newComment = (comment) => {
    // rendering the template
    let htmlString = nodeMailer.renderTemplate({comment: comment} , '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'Codeial | AqibM',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    }, (err , info) => {
        if(err){
            console.log('Error in sending mail' , err);
            return;
        }

        console.log('Message sent' , info);
        return;
    });
}