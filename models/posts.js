/**
 * Created by Lidy on 2016/12/9.
 */
function Post(name, head, title, tags, post, sort, description) {
    return {
        name: name,
        head: head,
        title: title,
        post: post,
        sort: sort,
        description: description
    }
}

module.exports = Post;