# AMP
google AMP Study
## envirement
- backend : express(nodemon), mySql, 
- client : AMP(browser-sync)

### issue
- 등록된 이미지 테이블의 관련된 게시물 정보 오기
```
SELECT 
g4_write_portfolio.wr_subject, 
g4_write_portfolio.wr_3,
g4_write_portfolio.wr_4,
g4_write_portfolio.wr_5,
g4_write_portfolio.wr_content,
g4_board_file.bf_file
FROM g4_write_portfolio
LEFT OUTER JOIN g4_board_file
ON g4_write_portfolio.wr_id = g4_board_file.wr_id
```
