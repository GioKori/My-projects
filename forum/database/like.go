package database

import (
	"database/sql"
	"fmt"
)

// Takes the likes of all users to a certain post.
func GetLikeByPost(db *sql.DB, post_id int) ([]Like, error) {
	result := []Like{}
	statement := "SELECT id, nickname, like FROM post_likes WHERE post_id = $1"
	rows, err := db.Query(statement, post_id)
	if err != nil {
		return nil, fmt.Errorf("GetPostLike: %w", err)
	}

	defer rows.Close()

	for rows.Next() {
		var like Like

		err := rows.Scan(&like.Id, &like.Nickname, &like.Value)
		if err != nil {
			return nil, fmt.Errorf("GetPostLike: %w", err)
		}

		like.Elem_Id = post_id

		result = append(result, like)
	}

	return result, nil
}

// Takes a certain user's like to one post.
func GetPostLikeByUser(db *sql.DB, nickname string, post_id int) (Like, error) {
	result := Like{}

	err := db.QueryRow("SELECT id, like FROM post_likes "+
		"WHERE nickname = $1 AND post_id = $2", nickname,
		post_id).Scan(&result.Id, &result.Value)
	if err != nil {
		return result, fmt.Errorf("GetPostLikeByUser: %w", err)
	}

	result.Nickname = nickname
	result.Elem_Id = post_id

	return result, nil
}

// Changes the value of the post's like in the table for the user.
func UpdatePostLike(db *sql.DB, new_value int, nickname string, post_id int) error {
	_, err := db.Exec("UPDATE post_likes SET like = $1 "+
		"WHERE nickname = $2 AND post_id = $3",
		new_value, nickname, post_id)

	return err
}

// Creates a row in the likes table for a post
func CreatePostLike(db *sql.DB, nickname string, like int, post_id int) error {
	statement := "INSERT INTO post_likes (nickname, like, post_id) VALUES ($1, $2, $3) returning id"
	stmt, err := db.Prepare(statement)
	if err != nil {
		return err
	}

	defer stmt.Close()
	id := 0
	err = stmt.QueryRow(nickname, like, post_id).Scan(&id)
	return err
}

// Returns a single user's like from the likes table for comments
func GetCommentLikeByUser(db *sql.DB, nickname string, comment_id int) (Like, error) {
	result := Like{}

	err := db.QueryRow("SELECT id, like FROM comment_likes "+
		"WHERE nickname = $1 AND comment_id = $2", nickname,
		comment_id).Scan(&result.Id, &result.Value)
	if err != nil {
		return result, fmt.Errorf("GetCommentLikeByUser: %w", err)
	}

	result.Nickname = nickname
	result.Elem_Id = comment_id

	return result, nil
}

// Returns all user likes by comment
func GetLikeByComment(db *sql.DB, comment_id int) ([]Like, error) {
	result := []Like{}

	statement := "SELECT id, nickname, like FROM comment_likes WHERE comment_id = $1"
	rows, err := db.Query(statement, comment_id)
	if err != nil {
		return nil, fmt.Errorf("GetLikeByComment: %w", err)
	}

	defer rows.Close()

	for rows.Next() {
		var like Like

		err := rows.Scan(&like.Id, &like.Nickname, &like.Value)
		if err != nil {
			return nil, fmt.Errorf("GetPostLike: %w", err)
		}

		like.Elem_Id = comment_id

		result = append(result, like)
	}

	return result, nil
}

// Changes the value of a single user's like for a comment
func UpdateCommentLike(db *sql.DB, new_value int, nickname string, comment_id int) error {
	_, err := db.Exec("UPDATE comment_likes SET like = $1 "+
		"WHERE nickname = $2 AND comment_id = $3",
		new_value, nickname, comment_id)

	return err
}

// Creates a row in the likes comments table
func CreateCommentLike(db *sql.DB, nickname string, like int, comment_id int) error {
	statement := "INSERT INTO comment_likes (nickname, like, comment_id) VALUES ($1, $2, $3) returning id"
	stmt, err := db.Prepare(statement)
	if err != nil {
		return err
	}

	defer stmt.Close()
	id := 0
	err = stmt.QueryRow(nickname, like, comment_id).Scan(&id)
	return err
}

// Returns the structure of the like made by the user for the post
func GetPostLikesByUser(db *sql.DB, nickname string) ([]Like, error) {
	var result []Like

	statement := "SELECT id, post_id, like FROM post_likes WHERE nickname = $1"
	rows, err := db.Query(statement, nickname)
	if err != nil {
		return nil, fmt.Errorf("GetPostLikesByUser: %w", err)
	}

	defer rows.Close()

	for rows.Next() {
		var like Like

		err := rows.Scan(&like.Id, &like.Elem_Id, &like.Value)
		if err != nil {
			return nil, fmt.Errorf("GetPostLike: %w", err)
		}

		like.Nickname = nickname

		result = append(result, like)
	}

	return result, nil
}

// Deletes a row from post likes table
func DeletePostLikes(db *sql.DB, postlike_id int) error {
	_, err := db.Exec("DELETE FROM post_likes WHERE id = $1",
		postlike_id)

	return err
}

// Deletes a row from comment likes table
func DeleteCommentLike(db *sql.DB, commentlike_id int) error {
	_, err := db.Exec("DELETE FROM comment_likes WHERE id = $1",
		commentlike_id)

	return err
}