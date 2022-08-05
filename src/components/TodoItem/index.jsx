import { Box, Checkbox, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { priorityList } from '../../constants/priority';

export default function TodoItem({
	id: idTodo,
	is_active,
	priority,
	title,
	activity_group_id,
	handleCheck,
	handleDelete,
	handleEdit,
}) {
	return (
		<Box
			height="80px"
			bg="#FFFFFF"
			boxShadow={`0px 6px 10px rgba(0, 0, 0, .1)`}
			borderRadius="12px"
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			p="28px"
			mb="10px"
		>
			<Box display="flex" gap="16px" alignItems="center">
				<Checkbox
					width="20px"
					height="20px"
					colorScheme="prime"
					isChecked={is_active}
					onChange={(e) => handleCheck(idTodo)}
				/>
				<Text
					as="span"
					display="inline-block"
					width="9px"
					height="9px"
					borderRadius="9px"
					backgroundColor={
						priorityList.find((data) => data.key === priority).color
					}
				></Text>
				<Text
					textStyle="h3"
					fontWeight="medium"
					color={is_active && '#888888'}
					textDecoration={is_active ? 'line-through' : 'none'}
				>
					{title}
				</Text>
				<Image
					src="/static/icons/todo-title-edit-button.svg"
					alt="todo-item-edit-button"
					width="20px"
					opacity={0.6}
					cursor="pointer"
					onClick={handleEdit}
				/>
			</Box>
			<Image
				src="/static/icons/delete.svg"
				alt="todo-item-delete-button"
				cursor="pointer"
				onClick={() =>
					handleDelete({
						activity_group_id,
						id: idTodo,
						is_active,
						priority,
						title,
					})
				}
			/>
		</Box>
	);
}
