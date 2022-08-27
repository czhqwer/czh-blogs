var domainUrl = "http://localhost:8080"; //后端 ip和接口

//弹出，3秒消失
function popup(msg) {
    $('body').append('<div id="over_container"><div id="over_message">' + msg + '</div></div>')
    setTimeout(function () {
        $('#over_container').remove();
    }, 3000)
}

//博客分页
function getArticleListPage(sortId, goPage) {
    $.ajax({
        url: domainUrl + "/articles/list",
        type: "POST",
        data: {
            sortId: sortId,
            currentPage: goPage
        },
        async: false,
        success: function (data) {
            pageList = data.data;
            articleList = data.data.list;
            blogsPage = data.data.pageNum;
            console.log(data.data);
        }
    })
}


//handlebars
var fillTemplate = function (templateObj, contentObj, fillData) {
    var templateHtml = templateObj.html();
    var template = Handlebars.compile(templateHtml);
    contentObj.html(template(fillData));
};