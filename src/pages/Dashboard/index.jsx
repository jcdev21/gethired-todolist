import {
	Box,
	Button,
	Grid,
	Image,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { IconPlus } from '../../components/Icons';
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { ModalDelete } from '../../components/Modals';

export default function Dashboard() {
	console.log('DASHBOARD');
	const [dataActivity, setDataActivity] = React.useState([
		{
			created_at: '2022-08-04T15:18:48.000Z',
			id: 23749458,
			title: 'New Activity 3',
		},
		{
			created_at: '2022-08-04T15:18:47.000Z',
			id: 23749457,
			title: 'New Activity 2',
		},
		{
			created_at: '2022-08-04T15:18:46.000Z',
			id: 23749456,
			title: 'New Activity 1',
		},
	]);
	const [dataSelected, setDataSelected] = React.useState({});
	const { isOpen, onOpen, onClose } = useDisclosure();
	let navigate = useNavigate();

	const handleClickDelete = (e, data) => {
		e.stopPropagation();
		setDataSelected(data);
		onOpen();
	};

	const handleDelete = () => {
		console.log(dataSelected);
		onClose();
	};

	return (
		<>
			<Box
				marginTop="43px"
				marginBottom="59px"
				display="flex"
				justifyContent="space-between"
			>
				<Text data-cy="activity-title" textStyle="h1">
					Activity
				</Text>
				<Button
					data-cy="activity-add-button"
					minW="150px"
					height="54px"
					bg={'prime.900'}
					color="white"
					borderRadius="45px"
					fontSize="18px"
					fontWeight="semibold"
					px="22px"
					py="13.5px"
					leftIcon={<IconPlus />}
				>
					Tambah
				</Button>
			</Box>
			<Grid
				templateColumns={
					dataActivity.length > 0 ? `repeat(4, 1fr)` : '1fr'
				}
				rowGap="26px"
				columnGap="20px"
			>
				{dataActivity.length > 0 ? (
					dataActivity.map((data, i) => (
						<Card
							dataCy={`activity-item-${i}`}
							handleClick={() =>
								navigate(`/item-list/${data.id}`)
							}
							key={data.id}
						>
							<Text data-cy="activity-item-title" textStyle="h3">
								{data.title}
							</Text>
							<Box
								display="inline-flex"
								justifyContent="space-between"
								alignItems="center"
								bg="white"
							>
								<Text
									data-cy="activity-item-date"
									as="span"
									fontSize="14px"
									fontWeight="medium"
									color="#888888"
									cursor="text"
								>
									{`
										${new Date(data.created_at).toLocaleString('id', {
											day: '2-digit',
										})} ${new Date(
										data.created_at
									).toLocaleString('id', {
										month: 'long',
									})} ${new Date(
										data.created_at
									).toLocaleString('id', { year: 'numeric' })}
									`}
								</Text>
								<Image
									data-cy="activity-item-delete-button"
									src="/static/icons/delete.svg"
									alt="title"
									cursor="pointer"
									onClick={(e) => handleClickDelete(e, data)}
								/>
							</Box>
						</Card>
					))
				) : (
					<Box
						data-cy="activity-empty-state"
						display="flex"
						justifyContent="center"
					>
						<Image
							src="/static/images/activity-empty-state.png"
							alt="activity-empty-state"
							marginBottom="50px"
						/>
					</Box>
				)}
			</Grid>
			<ModalDelete
				isOpen={isOpen}
				onClose={onClose}
				onAction={handleDelete}
				content={`Apakah anda yakin menghapus activity<br />
				<strong>“${dataSelected?.title}”?</strong>`}
			/>
		</>
	);
}
